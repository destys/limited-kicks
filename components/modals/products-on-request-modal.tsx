"use client";
import useProductsOnRequestModal from "@/hooks/use-products-on-requst-modal";
import Modal from "./modal";
import { useState } from "react";
import Image from "next/image";
import Input from "../ui/input/input";
import Textarea from "../ui/textarea/textarea";
import Radio from "../ui/radio/radio";
import Button from "../ui/button/button";
import styles from "./modals.module.scss";
import CheckBox from "../ui/checkbox/checkbox";

export default function ProductsOnRequestModal() {
    const [imageSource, setImageSource] = useState<string | null>(null);
    const { onClose, isOpen } = useProductsOnRequestModal();
    const [loading, setLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);
    const [acceptTermsError, setAcceptTermsError] = useState('');
    const [acceptPrivacyError, setAcceptPrivacyError] = useState('');

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            setIsImageLoading(true);
            reader.onload = (event) => {
                if (typeof event.target?.result === "string") {
                    setImageSource(event.target.result);
                    setIsImageLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isImageLoading) {
            alert("Подождите, пока изображение загрузится...");
            return;
        }

        setAcceptTermsError('');
        setAcceptPrivacyError('');

        let hasError = false;

        if (!acceptTerms) {
            setAcceptTermsError('Необходимо согласиться с условиями оферты и правилами');
            hasError = true;
        }
        if (!acceptPrivacy) {
            setAcceptPrivacyError('Необходимо согласиться с политикой обработки данных');
            hasError = true;
        }

        if (hasError) return;

        const form = e.target as HTMLFormElement;

        const product_name = form.product_name.value.trim();
        const person_name = form.person_name.value.trim();
        const phone = form.phone.value.trim();
        const comment = form.comment.value.trim();
        const messenger = form.oneClickMessengers.value;

        const errors: string[] = [];

        if (!product_name) errors.push("Введите название или артикул товара");
        if (!person_name) errors.push("Введите имя");
        if (!phone) errors.push("Введите телефон");
        if (!messenger) errors.push("Выберите способ связи");

        if (errors.length > 0) {
            alert("Ошибки в форме:\n\n" + errors.join("\n"));
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/product-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person_name,
                    phone,
                    comment,
                    product_name,
                    messenger,
                    image: imageSource,
                }),
            });

            const result = await res.json();
            if (result.success) {
                alert("Успешно отправлено!");
                onClose();
            } else {
                alert("Ошибка отправки формы");
            }
        } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={"Что ищем?"} isOpen={isOpen} onChange={onChange}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mb-5 md:mb-6">
                    <div className="h-full">
                        <label htmlFor="photo" className="flex items-center justify-center w-full h-full p-4 border-2 border-dashed border-add_4 rounded-2xl cursor-pointer">
                            {imageSource ? (
                                <Image src={imageSource} width={253} height={90} alt="Загрузить изображение" />
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <Image src={'/images/document-download.svg'} width={50} height={50} alt="Загрузить" />
                                    <p>Прикрепите фото товара</p>
                                </div>
                            )}
                        </label>
                        <input type="file" name="photo" id="photo" className="hidden" onChange={handleImageChange} />
                    </div>
                    <div>
                        <Input
                            type="text"
                            name="product_name"
                            label="Я знаю название или артикул"
                            placeholder="Введите информацию"
                            className="mb-4 md:mb-6"
                        />
                        <Textarea
                            name="comment"
                            label="Комментарий (Необязательно)"
                            placeholder="Комментарий"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mb-5 md:mb-6">
                    <Input
                        type="text"
                        name="person_name"
                        label="Имя"
                        placeholder="Введите Ваше имя"
                    />
                    <Input
                        type="tel"
                        name="phone"
                        label="Телефон"
                        placeholder="+7"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 items-center gap-5">

                    <div className="grid md:grid-cols-2 col-span-2 md:gap-4">
                        <CheckBox
                            id="accept_terms"
                            name="accept_terms"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            label='<div className="text-xs">
                                Я ознакомился(ась) и принимаю 
                                <a href="/publichnyj-dogovor-oferta-internet-servisa-limited-kicks-ru"><strong> условия договора-оферты</strong></a>, 
                                <a href="/terms"><strong> правила пользования сайтом</strong></a> и 
                                <a href="/polozhenie-ob-obmene-i-vozvrate-tovara"><strong> политику обмена и возврата товаров</strong></a>.
                            </div>'
                            wrapperClassNames="mb-3"
                        />
                        {acceptTermsError && <p className="text-xs mt-2 text-red-600">{acceptTermsError}</p>}

                        <CheckBox
                            id="accept_privacy"
                            name="accept_privacy"
                            checked={acceptPrivacy}
                            onChange={(e) => setAcceptPrivacy(e.target.checked)}
                            label='<div className="text-xs">
                                Я даю согласие на обработку моих персональных данных в соответствии с 
                                <a href="/polozhenie-po-rabote-s-personalnymi-dannymi"><strong> Политикой обработки персональных данных</strong></a>.
                            </div>'
                            wrapperClassNames="mb-4"
                        />
                        {acceptPrivacyError && <p className="text-xs mt-2 text-red-600">{acceptPrivacyError}</p>}
                        <div className="max-md:mb-4">
                            <h3 className="mb-2">Способ связи</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Radio
                                    label="Telegram"
                                    name="oneClickMessengers"
                                    id="oneClickTg"
                                    value="Telegram"
                                    defaultChecked
                                    className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-black peer-checked:text-white"
                                />
                                <Radio
                                    label="WhatsApp"
                                    name="oneClickMessengers"
                                    id="oneClickWa"
                                    value="WhatsApp"
                                    className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-black peer-checked:text-white"
                                />
                            </div>
                        </div>
                        <Button type="submit" styled="filled" className={`${styles.toCartLink} w-full h-fit mt-auto font-medium md:text-lg hover:fill-main`}>
                            {loading ? "Отправка…" : "Отправить"}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}