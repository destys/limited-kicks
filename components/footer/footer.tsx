import Link from "next/link";
import Image from "next/image";

import Menu from "@/components/menu/menu";

import styles from "./footer.module.scss";

export default function Footer() {
    const menuItems = [
        { id: 1, title: "Вопрос-ответ" },
        { id: 2, title: "Как подобрать размер?" },
        { id: 3, title: "Оплата" },
        { id: 4, title: "Доставка" },
        { id: 5, title: "Обмен" },
        { id: 6, title: "Возврат" },
        { id: 7, title: "Гарантия" },
        { id: 8, title: "Карта сайта" },
    ];

    const menuBottomFooterItems = [
        { id: 2, title: "Возврат" },
        { id: 3, title: "Доставка" },
        { id: 4, title: "Оплата" },
        { id: 5, title: "Офферта" },
        { id: 1, title: "Политика конфиденциальности" },
    ];
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
                    <Link
                        href={"/"}
                        className="flex justify-center sm:justify-start sm:mr-11"
                    >
                        <Image
                            src="/logo_white.svg"
                            alt="logotype"
                            width={287}
                            height={130}
                        />
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <Menu
                    title={"Инфо"}
                    containerClassList=""
                    titleClassList="mb-5 font-mediun text-2xl"
                    menuClassList="flex flex-col gap-2"
                    items={menuItems}
                />
                <Menu
                    title={"Инфо"}
                    containerClassList=""
                    titleClassList="mb-5 font-mediun text-2xl"
                    menuClassList="flex flex-col gap-2"
                    items={menuItems}
                />
                <Menu
                    title={"Инфо"}
                    containerClassList=""
                    titleClassList="mb-5 font-mediun text-2xl"
                    menuClassList="flex flex-col gap-2"
                    items={menuItems}
                />
                <Menu
                    title={"Инфо"}
                    containerClassList=""
                    titleClassList="mb-5 font-mediun text-2xl"
                    menuClassList="flex flex-col gap-2"
                    items={menuItems}
                />
            </div>
            <div className={styles.bottom}>
                <Menu
                    items={menuBottomFooterItems}
                    menuClassList="flex flex-col md:flex-row gap-3 md:ga-6 lg:gap-14"
                    menuItemClassList="lg:text-lg"
                />
            </div>
        </footer>
    );
}
