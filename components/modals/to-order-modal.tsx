"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Price from "../price/price";
import Radio from "../ui/radio/radio";
import useOneClickModal from "@/hooks/use-one-click-modal";
import Modal from "./modal";
import useUser from "@/hooks/use-user";
import { User } from "@/types";
import getUser from "@/actions/get-user";
import Link from "next/link";
import Loader from "../ui/loader/loader";
import CheckBox from "../ui/checkbox/checkbox";
import toast from "react-hot-toast";
import { fetchWooCommerce } from "@/lib/utils";
import { PacmanLoader } from "react-spinners";
import useToOrderModal from "@/hooks/use-to-order-modal";
import { twMerge } from "tailwind-merge";

import styles from "./modals.module.scss";
import ym from "react-yandex-metrika";

export default function ToOrderModal() {
    const { onClose, isOpen, product, sizeValue, entrySize, image } = useToOrderModal();
    const { jwtToken, login } = useUser();
    const [count, setCount] = useState(1);
    const [user, setUser] = useState<User | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeTermsError, setAgreeTermsError] = useState('');
    const [agreePrivacyError, setAgreePrivacyError] = useState('');

    useEffect(() => {
        const FetchData = async () => {
            if (jwtToken !== null) {
                try {
                    const userData = await getUser(jwtToken);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                }
            }
        }
        FetchData();
    }, [jwtToken])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPhoneError('');
        setNameError('');
        setAgreeTermsError('');
        setAgreePrivacyError('');

        const form = e.target as HTMLFormElement;
        const phone = form.phone.value.trim();
        const name = form.oneClickName?.value?.trim();

        let hasError = false;

        if (!name) {
            setNameError("Введите имя");
            hasError = true;
        }

        if (phone.length < 16) {
            setPhoneError("Некорректный телефон");
            hasError = true;
        }

        if (!agreeTerms) {
            setAgreeTermsError("Необходимо принять условия");
            hasError = true;
        }

        if (!agreePrivacy) {
            setAgreePrivacyError("Необходимо согласие с политикой обработки данных");
            hasError = true;
        }

        if (hasError) return;

        try {
            setLoading(true);
            const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/send-sms-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });

            if (response.ok) {
                setShowConfirmation(true);
                setPhone(phone);
            } else {
                toast.error("Ошибка при отправке SMS");
            }
        } catch (error: any) {
            console.error('error: ', error);
            toast.error("Ошибка при авторизации");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const code = form.code.value;
        try {
            setLoading(true)
            const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/verify-sms-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, code }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.data.data.token)
                setShowConfirmation(false);
            }
        } catch (error: any) {
            console.error('error: ', error);
        } finally {
            setLoading(false);
        }
    }

    const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let hasError = false;

        setAgreeTermsError('');
        setAgreePrivacyError('');

        if (!agreeTerms) {
            setAgreeTermsError("Необходимо принять условия");
            hasError = true;
        }

        if (!agreePrivacy) {
            setAgreePrivacyError("Необходимо согласие с политикой обработки данных");
            hasError = true;
        }

        if (hasError) return;

        const order = {
            status: 'processing',
            customer_id: user?.id || 0,
            set_paid: true,
            line_items: [{
                product_id: product?.id,
                quantity: count,
                variation_id: entrySize?.id,
            }],
            shipping_lines: [{
                method_id: 3,
            }],
        }

        try {
            setLoading(true);
            const orderResponse = await fetchWooCommerce("orders", {
                withCredentials: true
            }, 'post', order);
            toast.success('Заказ успешно оформлен');

            if (typeof window !== 'undefined' && typeof ym !== 'undefined') {
                ym("100049821", 'reachGoal', entrySize && entrySize.regular_price !== "0" ? "order3" : "order2");
            }

            onClose();
        } catch (error) {
            console.error('Failed to submit order:', error);
            toast.error('Ошибка при оформлении заказа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={entrySize.price && entrySize.price.toString() === '0' ? "Узнать стоимость" : "Подтвердить лучшую стоимость"} isOpen={isOpen} onChange={onChange}>
            {product && (
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-7" onSubmit={user ? handleCheckout : handleAuth}>
                    <div>
                        <div className="flex justify-center lg:block mb-4">
                            {image && (
                                <Image
                                    src={image?.src}
                                    width={498}
                                    height={362}
                                    alt={product.name}
                                    className="max-h-[220px] sm:max-h-[362px] object-contain"
                                />
                            )}
                        </div>
                        <h3 className="mb-6 max-md:text-base max-xs:text-sm lg:uppercase">{product.name}</h3>
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            <div>
                                <p className="mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base">Размер</p>
                                <p className="font-medium text-xs xs:text-sm sm:text-base lg:text-xl uppercase">{sizeValue}</p>
                            </div>
                            <div className="flex justify-center md:gap-2 col-span-2 items-center font-medium md:text-xl">
                                <button onClick={() => setCount(count > 1 ? count - 1 : 1)} className="w-8 h-8 md:w-12 md:h-12 bg-add_1 rounded-lg">-</button>
                                <div className="w-12 text-center">{count}</div>
                                <button onClick={() => setCount(count + 1)} className="w-8 h-8 md:w-12 md:h-12 bg-add_1 rounded-lg">+</button>
                            </div>
                            <div>
                                <p className="mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base">Сумма</p>
                                <p className="whitespace-nowrap font-medium text-xs xs:text-sm sm:text-base lg:text-base">По запросу</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 lg:gap-6">
                        {user ? (
                            <Link href="/profile" className="flex items-center gap-5 rounded p-5 border border-add_4">
                                <div className="rounded-full overflow-hidden shrink-0 basis-[50px] h-[50px] relative">
                                    <Image src={'/images/avatar.jpg'} fill alt="user avatar" />
                                </div>
                                <div>
                                    <div>{`${user.first_name} ${user.last_name}`}</div>
                                    <div className="text-sm text-add_4">{user.username.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')}</div>
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Input type="text" label="Ваше имя" name="oneClickName" placeholder="Введите имя" />
                                {nameError && <p className="text-xs mt-1 text-red-600">{nameError}</p>}
                                <Input type="tel" label="Ваш телефон" name="phone" placeholder="Введите телефон" className={twMerge("", phoneError && "mb-0 border-red-600")} />
                                {phoneError && <p className="text-xs mt-1 text-red-600">{phoneError}</p>}
                            </>
                        )}

                        <h3>Способ связи</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Radio label="Telegram" name="oneClickMessengers" id="oneClickTg" defaultChecked className="!p-3 sm:p-4 justify-center font-medium text-lg peer-checked:bg-add_2 peer-checked:text-white" value="Telegram" />
                            <Radio label="WhatsApp" name="oneClickMessengers" id="oneClickWa" className="!p-3 sm:p-4 justify-center font-medium text-lg peer-checked:bg-add_2 peer-checked:text-white" value="WhatsApp" />
                        </div>
                        <div className="privacy">
                            <CheckBox id="agreeTerms" name="agreeTerms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} label='<div className="text-xs">Я ознакомился(ась) и принимаю <a href="/publichnyj-dogovor-oferta-internet-servisa-limited-kicks-ru"><strong>условия договора-оферты</strong></a>, правила пользования сайтом и <a href="/polozhenie-ob-obmene-i-vozvrate-tovara"><strong>политику обмена и возврата товаров</strong></a>.</div>' />
                            {agreeTermsError && <p className="text-xs mt-1 text-red-600">{agreeTermsError}</p>}
                        </div>
                        <div className="privacy">
                            <CheckBox id="agreePrivacy" name="agreePrivacy" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} label='<div className="text-xs">Я даю согласие на обработку моих персональных данных в соответствии с <a href="/polozhenie-po-rabote-s-personalnymi-dannymi"><strong>Политикой обработки персональных данных</strong></a>.</div>' />
                            {agreePrivacyError && <p className="text-xs mt-1 text-red-600">{agreePrivacyError}</p>}
                        </div>
                        <Button className={`${styles.toCartLink} w-full font-medium md:text-lg hover:fill-main`} type="submit" styled="filled">
                            {loading ? <PacmanLoader color="#fff" size={18} className="fill-main" /> : "Получить лучшую стоимость в России"}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}