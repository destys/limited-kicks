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

export default function ProductsOnRequestModal() {
    const [imageSource, setImageSource] = useState<string | null>(null);
    const { onClose, isOpen } = useProductsOnRequestModal();
    const [loading, setLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

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

        setLoading(true);
        const form = e.target as HTMLFormElement;

        try {
            console.log('imageSource: ', imageSource);
            const res = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/product-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person_name: form.person_name.value,
                    phone: form.phone.value,
                    comment: form.comment.value,
                    product_name: form.product_name.value,
                    messenger: form.oneClickMessengers.value,
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
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mb-5 md:mb-8 lg:mb-10">
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
                            className="mb-4 md:mb-6 lg:mb-10"
                        />
                        <Textarea
                            name="comment"
                            label="Комментарий (Необязательно)"
                            placeholder="Комментарий"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mb-5 md:mb-8 lg:mb-10">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
                    <div className="hidden justify-center items-center h-full min-h-20 lg:flex" />
                    <div>
                        <h3 className="mb-2">Способ связи</h3>
                        <div className="grid grid-cols-2 gap-2 mb-6">
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
                        <Button type="submit" styled="filled" className={`${styles.toCartLink} w-full font-medium md:text-lg hover:fill-main`}>
                            {loading ? "Отправка…" : "Отправить"}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}