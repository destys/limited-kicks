"use client";
import useProductsOnRequestModal from "@/hooks/use-products-on-requst-modal";


import Modal from "./modal";
import { useState } from "react";
import Image from "next/image";
import Input from "../ui/input/input";
import Textarea from "../ui/textarea/textarea";
import Radio from "../ui/radio/radio";
import Button from "../ui/button/button";

export default function ProductsOnRequestModal() {
    const [imageSource, setImageSource] = useState<string | null>(null);
    const { onClose, isOpen } = useProductsOnRequestModal();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent: ProgressEvent<FileReader>) => {

                if (loadEvent.target && typeof loadEvent.target.result === 'string') {
                    setImageSource(loadEvent.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal title={"Что ищем?"} isOpen={isOpen} onChange={onChange}>
            <form action="">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mb-5 md:mb-8 lg:mb-10">
                    <div className="h-full">
                        <label htmlFor="photo" className="flex items-center justify-center w-full h-full border-2 border-dashed border-add_4 rounded-2xl cursor-pointer">
                            {imageSource ? <Image src={imageSource} width={253} height={90} alt="Загрузить изображение" /> : (
                                <div className="flex flex-col items-center gap-3">
                                    <Image src={'/images/document-download.svg'} width={50} height={50} alt="Загрузить" />
                                    <p>Прикрепите фото товара</p>
                                </div>
                            )}

                        </label>
                        <input type="file" name="photo" id="photo" className="hidden" onChange={handleImageChange} />
                    </div>
                    <div>
                        <Input type="text" name="name" label="Я знаю название или артикул" placeholder="Введите информацию" className="mb-4 md:mb-6 lg:mb-10" />
                        <Textarea name="comment" label="Комментарий (Необязательно)" placeholder="Комментарий" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mb-5 md:mb-8 lg:mb-10">
                    <Input type="text" name="name" label="Имя" placeholder="Введите Ваше имя" />
                    <Input type="tel" name="tel" label="Телефон" placeholder="+7" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
                    <div className="flex justify-center items-center bg-add_1 h-full min-h-20">Капча</div>
                    <div>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <Radio
                                label={"Telegram"}
                                name="oneClickMessengers"
                                id="oneClickTg"
                                defaultChecked
                                className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-black peer-checked:text-white"
                                value="Telegram"
                            />
                            <Radio
                                label={"WhatsApp"}
                                name="oneClickMessengers"
                                id="oneClickWa"
                                className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-black peer-checked:text-white"
                                value="WhatsApp"
                            />
                        </div>
                        <Button type="submit" styled="filled" className="w-full">Отправить</Button>
                    </div>

                </div>
            </form>

        </Modal>
    );
}
