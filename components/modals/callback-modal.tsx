"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import Modal from "./modal";
import { useCallbackModal } from "@/hooks/use-callback-modal";
import { cn } from "@/lib/utils";
import CheckBox from "../ui/checkbox/checkbox";

// Типы способов связи
type ContactMethod = "wa" | "tg" | "phone";

// Zod-схема
const schema = z
    .object({
        method: z.enum(["tg", "wa", "phone"]),
        phone: z.string().optional(),
        telegram: z.string().optional(),
        agree1: z.boolean().refine(val => val === true, {
            message: "Необходимо согласие с условиями",
        }),
        agree2: z.boolean().refine(val => val === true, {
            message: "Необходимо согласие с условиями",
        }),
    })
    .superRefine((data, ctx) => {
        if (data.method === "tg") {
            const phoneFilled = !!data.phone && data.phone.trim() !== "";
            const telegramFilled = !!data.telegram && data.telegram.trim() !== "";
            if (!phoneFilled && !telegramFilled) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Укажите хотя бы одно поле: Telegram или номер телефона",
                    path: ["telegram"],
                });
            }
        } else {
            if (!data.phone || data.phone.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Введите номер телефона",
                    path: ["phone"],
                });
            }
        }
    });

type FormData = z.infer<typeof schema>;

export default function CallbackModal() {
    const { isOpen, onClose } = useCallbackModal();
    const [method, setMethod] = useState<ContactMethod>("tg");
    const [loading, setLoading] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            method: "tg",
            phone: "",
            telegram: "",
            agree1: false,
            agree2: false,
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = form;

    const onSubmit = async (data: FormData) => {
        console.log("Отправка формы:", data);
        try {
            setLoading(true);
            const res = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/product-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: data.phone,
                    telegram: data.telegram,
                    messenger: method,
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

    const onChange = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <Modal title=" " isOpen={isOpen} onChange={onChange} contentClassNames="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 font-medium text-3xl uppercase font-unbounded">
                    Выберите способ связи
                </div>
                <p className="mb-7 text-muted-foreground text-sm text-[#8F8F8F]">
                    И наш менеджер свяжется с вами в ближайшее время
                </p>

                <div className="grid grid-cols-3 gap-2 w-full mb-6">
                    {(["tg", "wa", "phone"] as ContactMethod[]).map((option) => (
                        <Button
                            key={option}
                            type="button"
                            className={cn(
                                "border-0 text-black hover:bg-main",
                                method === option ? "bg-main text-white" : "bg-add_1"
                            )}
                            styled="filled"
                            onClick={() => {
                                setValue("method", option);
                                setMethod(option);
                            }}
                        >
                            {option === "wa" && "WhatsApp"}
                            {option === "tg" && "Telegram"}
                            {option === "phone" && "Телефон"}
                        </Button>
                    ))}
                </div>

                <div className="max-w-[608px] space-y-7">
                    {(method === "wa" || method === "phone" || method === "tg") && (
                        <div className="space-y-2">
                            <label>Номер телефона</label>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="tel"
                                        placeholder="Введите телефон"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                            )}
                        </div>
                    )}

                    {method === "tg" && (
                        <div className="space-y-2">
                            <label>Ваш ник через @</label>
                            <Controller
                                name="telegram"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="Введите Ник через @"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.telegram && (
                                <p className="text-sm text-red-500 mt-1">{errors.telegram.message}</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="grid md:grid-cols-2 gap-2 mt-4">
                    <div>
                        <Controller
                            name="agree1"
                            control={control}
                            render={({ field }) => (
                                <CheckBox
                                    id="agree1"
                                    name="agree1"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    label={`<div className="text-xs">
        Я ознакомился(ась) и принимаю <a href="/publichnyj-dogovor-oferta-internet-servisa-limited-kicks-ru"><strong>условия договора-оферты</strong></a>, правила пользования сайтом и <a href="/polozhenie-ob-obmene-i-vozvrate-tovara"><strong>политику обмена и возврата товаров</strong></a>.
      </div>`}
                                    wrapperClassNames="mb-2"
                                />
                            )}
                        />
                        {errors.agree1 && (
                            <p className="text-sm text-red-500 mt-1">{errors.agree1.message}</p>
                        )}
                    </div>
                    <div>
                        <Controller
                            name="agree2"
                            control={control}
                            render={({ field }) => (
                                <CheckBox
                                    id="agree2"
                                    name="agree2"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    label={`<div className="text-xs">
        Я даю согласие на обработку моих персональных данных в соответствии с <a href="/polozhenie-po-rabote-s-personalnymi-dannymi"><strong>Политикой обработки персональных данных</strong></a>.
      </div>`}
                                    wrapperClassNames="mb-4"
                                />
                            )}
                        />
                        {errors.agree2 && (
                            <p className="text-sm text-red-500 mt-1">{errors.agree2.message}</p>
                        )}
                    </div>
                </div>

                <Button
                    styled="filled"
                    type="submit"
                    className="w-fit mt-4 bg-main border-main btn-shine"
                    disabled={loading}
                >
                    {loading ? "Отправка…" : (
                        <>
                            {method === "tg" && "Напишите в Telegram"}
                            {method === "wa" && "Напишите в WhatsApp"}
                            {method === "phone" && "Заказать звонок"}
                        </>
                    )}
                </Button>

            </form>
        </Modal>
    );
}