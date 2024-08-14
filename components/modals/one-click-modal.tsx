"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

import Image from "next/image";
import { useState } from "react";
import Price from "../price/price";
import Radio from "../ui/radio/radio";
import useOneClickModal from "@/hooks/use-one-click-modal";
import Modal from "./modal";

export default function OneClickModal() {
    const { onClose, isOpen, product, sizeValue, entrySize, image } = useOneClickModal();

    const [count, setCount] = useState(1);

    const router = useRouter();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onChange(!open);
        router.push("/cabinet");
    };

    return (
        <Modal title={"Покупка в 1 клик"} isOpen={isOpen} onChange={onChange}>
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
                                <Price
                                    value={count * entrySize.price}
                                    className="font-medium text-xs xs:text-sm sm:text-base lg:text-xl"
                                />
                            </div>
                        </div>
                    </div>
                    <form className="grid gap-4 lg:gap-6" onSubmit={onSubmit}>
                        <div className="grid grid-cols-2 gap-2">
                            <Radio
                                label={"Доставка"}
                                name="oneClickDelivery"
                                id="oneClickDelivery"
                                defaultChecked
                                className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
                                value="Доставка"
                            />
                            <Radio
                                label={"Самовывоз"}
                                name="oneClickDelivery"
                                id="oneClickPickup"
                                className="!p-3 sm:p-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
                                value="Самовывоз"
                            />
                        </div>
                        <Input
                            type="text"
                            label="Ваше имя"
                            name={"oneClickName"}
                            placeholder="Введите имя"
                        />
                        <Input
                            type={"tel"}
                            name={"oneClickPhone"}
                            label="Номер телефона"
                            placeholder="Введите телефон"
                        />
                        <div className="flex items-end gap-3 w-full">
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
                        </div>
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
                        <Button className={"w-full font-medium md:text-lg"} type="submit" styled="filled">
                            Оформить заказ
                        </Button>
                    </form>
                </div>
            )}
        </Modal>
    );
}
