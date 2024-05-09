"use client";
import { IMenu, IMenuItem } from "@/types";

import { useEffect, useState } from "react"
import Image from "next/image";

import MainMenuItem from "./main-menu-item";
import Link from "next/link";
import getMenu from "@/actions/get-menu";
import useMainMenu from "@/hooks/use-main-menu";

interface IMainMenu {
    items: IMenuItem[]
}

const MainMenu = () => {
    const { isOpen, onClose } = useMainMenu();

    const [menu, setMenu] = useState<IMainMenu | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await getMenu(58);
            setMenu(res);
        }
        fetchMenu();
    }, [])

    return (
        <div className={`fixed top-0 left-0 w-full h-[100vh] ${isOpen ? "opacity-100 z-[30]" : "opacity-0 z-[-1]"}`}>
            <div className={`absolute inset-0 max-w-[412px] h-full z-50  ${isOpen ? "!translate-x-0" : "translate-x-[-100%]"}`}>
                <div className="relative">
                    <div className="h-[250px]">
                        <Image src={"/images/best-sellers.png"} fill alt="menu" objectFit="cover" />
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4">
                        <Image src={"/icons/Icon/Close.svg"} width={30} height={30} alt="close" />
                    </button>
                </div>
                <nav className="bg-white h-[calc(100vh-250px)] overflow-y-auto pb-10">
                    <div className="flex justify-between items-center gap-3 px-3 py-4 border-b border-add_1">
                        <h3>Каталог</h3>
                        <Link href="/shop" className="text-xs text-add_4">Посмотреть все</Link>
                    </div>
                    {menu?.items?.map(item => (
                        <MainMenuItem key={item.id} data={item} onClose={onClose} />
                    ))}
                </nav>
            </div>
            <div className="absolute inset-0 z-40 bg-black bg-opacity-35" onClick={onClose}></div>
        </div>
    )
}

export default MainMenu