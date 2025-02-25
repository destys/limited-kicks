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
import toast from "react-hot-toast";
import { fetchWooCommerce } from "@/lib/utils";
import { PacmanLoader } from "react-spinners";
import useToOrderModal from "@/hooks/use-to-order-modal";
import { twMerge } from "tailwind-merge";

export default function ToOrderModal() {
    const { onClose, isOpen, product, sizeValue, entrySize, image } = useToOrderModal();
    const { jwtToken, login } = useUser();
    const [count, setCount] = useState(1);
    const [user, setUser] = useState<User | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(false);

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
        const form = e.target as HTMLFormElement;
        const phone = form.phone.value;

        if (phone.length < 16) return setPhoneError('Некорректный телефон');

        try {
            setLoading(true)
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
            }
        } catch (error: any) {
            console.error('error: ', error);
        } finally {
            setLoading(false);
        }
        setShowConfirmation(true);
    }

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
        setLoading(true);

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
            const orderResponse = await fetchWooCommerce("orders", {
                withCredentials: true
            }, 'post', order);
            toast.success('Заказ успешно оформлен');
            onClose();
        } catch (error) {
            console.error('Failed to submit order:', error);
            toast.error('Ошибка при оформлении заказа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={"Узнать стоимость"} isOpen={isOpen} onChange={onChange}>
            {product && (
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-7">
                    <div>
                        <div className="flex justify-center lg:block mb-4">
                            {image && (
                                <Image
                                    src={image?.src}
                                    width={498}
                                    height={362}
                                    alt={product.name}
                                    className="max-h-[362px] object-contain"
                                />
                            )}
                        </div>
                        <h3 className="mb-6 max-md:text-base max-xs:text-sm lg:uppercase">{product.name}</h3>
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            <div>
                                <p className="mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base">Размер</p>
                                <p className="font-medium text-xs xs:text-sm sm:text-base lg:text-xl uppercase">
                                    {sizeValue}
                                </p>
                            </div>
                            <div className="flex justify-center md:gap-2 col-span-2 items-center font-medium md:text-xl">
                                <button
                                    onClick={() => setCount(count > 1 ? count - 1 : 1)}
                                    className="w-8 h-8 md:w-12 md:h-12 bg-add_1 rounded-lg"
                                >
                                    -
                                </button>
                                <div className="w-12 text-center">{count}</div>
                                <button
                                    onClick={() => setCount(count + 1)}
                                    className="w-8 h-8 md:w-12 md:h-12 bg-add_1 rounded-lg"
                                >
                                    +
                                </button>
                            </div>
                            <div>
                                <p className="mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base">Сумма</p>
                                <p className="whitespace-nowrap font-medium text-xs xs:text-sm sm:text-base lg:text-base">По запросу</p>
                            </div>
                        </div>
                    </div>
                    {showConfirmation ? (
                        <form className="grid gap-4 lg:gap-6" onSubmit={handleConfirmation}>
                            <Input
                                type="text"
                                placeholder="Код из смс"
                                name="code"
                            />
                            <Button styled="filled" type="submit">Подтвердить номер</Button>
                        </form>
                    ) : (
                        <form className="grid gap-4 lg:gap-6" onSubmit={user ? handleCheckout : handleAuth}>

                            {user ? (
                                <Link href="/profile" className="flex items-center gap-5 rounded p-5 border border-add_4">
                                    <div className="rounded-full overflow-hidden shrink-0 basis-[50px] h-[50px] relative">
                                        <Image src={'/images/avatar.jpg'} fill alt="user avatar" />
                                    </div>
                                    <div>
                                        <div>{`${user.first_name} ${user.last_name}`}</div>
                                        <div className="text-sm text-add_4">
                                            {user.username.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')}
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <div>
                                        <Input
                                            type="text"
                                            label="Ваше имя"
                                            name={"oneClickName"}
                                            placeholder="Введите имя"
                                        />
                                    </div>
                                    <div className="mb-2.5 md:mb-5">
                                        <Input
                                            type="tel"
                                            label="Ваш телефон"
                                            className={twMerge("", phoneError && "mb-0 border-red-600")}
                                            placeholder="Введите телефон"
                                            name="phone"

                                        />
                                        {phoneError && <p className="text-xs mt-2 text-red-600">{phoneError}</p>}
                                    </div>

                                </>

                            )}

                            {/* <div className="flex items-end gap-3 w-full">
                            <div className="flex-auto">
                                <Input
                                    type="text"
                                    label={"Промокод"}
                                    name={"oneClickPhone"}
                                    className="flex-auto"
                                    placeholder="Введите промокод"
                                />
                            </div>
                            <Button type="button" styled={'filled'}>Применить</Button>
                        </div> */}
                            <div className="grid grid-cols-2 gap-2">
                                <Radio
                                    label={"Telegram"}
                                    name="oneClickMessengers"
                                    id="oneClickTg"
                                    defaultChecked
                                    className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
                                    value="Telegram"
                                />
                                <Radio
                                    label={"WhatsApp"}
                                    name="oneClickMessengers"
                                    id="oneClickWa"
                                    className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
                                    value="WhatsApp"
                                />
                            </div>
                            <Button className={"w-full font-medium md:text-lg hover:fill-main"} type="submit" styled="filled">
                                {loading ? <PacmanLoader color="#fff" size={18} className="fill-main" /> : (
                                    "Узнать стоимость"
                                )}

                            </Button>
                        </form>
                    )
                    }

                </div >
            )}
        </Modal >
    );
}
