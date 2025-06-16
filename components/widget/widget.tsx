'use client'

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils" // Если нет — убери cn() и используй обычный className
import Link from "next/link"
import { useCallbackModal } from "@/hooks/use-callback-modal"

export const Widget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { onOpen } = useCallbackModal();

    return (
        <div className="fixed right-2 lg:right-8 bottom-[72px] lg:bottom-8 z-[10000]  flex flex-col items-end">
            <div className="relative">
                {/* Кнопка открытия */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="absolute right-0 bottom-0 z-[10000] size-14 lg:size-[80px] bg-[#5E78FF] flex justify-center items-center rounded-full transition-all duration-300"
                    >
                        <Image src="/widget/like.svg" alt="like" width={40} height={40} />
                        <span className="absolute top-3 right-1 size-3 bg-red-500 rounded-full" />
                    </button>
                )}

                {/* Кнопки виджета */}
                <div
                    className={cn(
                        "flex flex-col items-end transition-all duration-500 ease-in-out origin-bottom ",
                        isOpen ? "opacity-100 scale-100 h-full translate-y-0 pointer-events-auto" : "opacity-0 scale-90 h-0 translate-y-4 pointer-events-none"
                    )}
                >
                    <div className="space-y-3 mt-4">
                        <Link href={'https://wa.me/+79951508080'} target="_blank" rel="nofollow" className="group flex justify-center items-center relative size-12 lg:size-[80px] p-2 rounded-full bg-[#25D366] shadow-md">
                            <Image src="/widget/wa.svg" alt="whatsapp" width={52} height={52} />
                            <span className="absolute top-1/2 right-[120%] -translate-y-1/2 bg-[#F5F5F5] rounded-[15px] py-1 px-2 whitespace-nowrap text-[#3F4662] text-xs hidden lg:block -z-10 opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all">WhatsApp</span>
                        </Link>
                        <Link href={'https://t.me/LimitedKicksOfficial'} target="_blank" rel="nofollow" className="group flex justify-center items-center relative size-12 lg:size-[80px] p-2 rounded-full bg-[#37AEE2] shadow-md">
                            <Image src="/widget/tg.svg" alt="telegram" width={52} height={52} />
                            <span className="absolute top-1/2 right-[120%] -translate-y-1/2 bg-[#F5F5F5] rounded-[15px] py-1 px-2 whitespace-nowrap text-[#3F4662] text-xs hidden lg:block -z-10 opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all">Telegram</span>
                        </Link>
                        <button className="group flex justify-center items-center size-12 lg:size-[80px] p-2 rounded-full bg-[#5E78FF]  shadow-md relative" onClick={onOpen}>
                            <Image src="/widget/form.svg" alt="form" width={52} height={52} />
                            <span className="absolute top-1/2 right-[120%] -translate-y-1/2 bg-[#F5F5F5] rounded-[15px] py-1 px-2 whitespace-nowrap text-[#3F4662] text-xs hidden lg:block -z-10 opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all">Обратная связь</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex justify-center items-center size-12 lg:size-[80px] rounded-full bg-white border border-[#c5c5c5] p-3 lg:p-5 shadow-md"
                        >
                            <Image src="/widget/cross.svg" alt="close" width={52} height={52} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}