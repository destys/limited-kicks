"use client";
import { IMenuItem } from "@/types";

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
            console.log('res: ', res);
            setMenu(res);
        }
        fetchMenu();
    }, [])

    return (
        <div className={`fixed top-0 left-0 w-full h-[100vh] opacity-100 z-[10000] ${isOpen ? 'block' : 'hidden'}`}>
            <div className={`absolute inset-0 max-w-[412px] h-full z-50  ${isOpen ? "!translate-x-0" : "translate-x-[-100%]"}`}>
                <div className="relative">
                    <div className="h-[250px]">
                        <Image src={"/images/best-sellers.png"} width={412} height={250} alt="menu" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={() => onClose()} className="absolute top-4 right-4">
                        <Image src={"/icons/Icon/Close.svg"} width={30} height={30} alt="close" onClick={onClose} />
                    </button>
                </div>
                <nav className="bg-white h-[calc(100vh-250px)] overflow-y-auto pb-10">
                    <div className="flex justify-between items-center gap-3 px-3 py-4 border-b border-add_1">
                        <h3>Каталог</h3>
                        <Link href="/shop" className="text-xs text-add_4" onClick={onClose}>Посмотреть все</Link>
                    </div>
                    {menu?.items?.map(item => (
                        <MainMenuItem key={item.id} data={item} onClose={onClose} />
                    ))}
                </nav>
            </div>
            <div className={`absolute inset-0 z-40 bg-black bg-opacity-35 ${!isOpen && 'w-0 h-0'}`} onClick={onClose}></div>
        </div>
    )
}

export default MainMenu