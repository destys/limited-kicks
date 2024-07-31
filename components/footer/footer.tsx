import Link from "next/link";
import Image from "next/image";

import getMenu from "@/actions/get-menu";

import Menu from "@/components/menu/menu";

import styles from "./footer.module.scss";

export default async function Footer() {
    const menuInfo = await getMenu(50);
    const menuBrands = await getMenu(51);
    const menuPopular = await getMenu(52);
    const menuDocs = await getMenu(53);

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
                    data={menuInfo.items}
                />
                <div className="">
                    <div className="mb-5 font-mediun text-2xl">Контакты</div>
                    <ul className="flex flex-col gap-2">
                        <li>
                            Напишите нам в {" "}
                            <Link href="#" className="font-medium hover:text-main">WhatsApp</Link>
                        </li>
                        <li>
                            Напишите нам в {" "}
                            <Link href="#" className="font-medium hover:text-main">Telegram</Link>
                        </li>
                        <li>
                            Позвоните нам {" "}
                            <Link href="tel:+79951508080" className="font-medium hover:text-main whitespace-nowrap">+7 (995) 150-80-80</Link>
                        </li>
                        <li>
                            Наша почта  {" "}
                            <Link href="mailto:hello@limited-kicks.ru" className="font-medium hover:text-main">hello@limited-kicks.ru</Link>
                        </li>
                    </ul>
                </div>
                <Menu
                    title={"Бренды"}
                    containerClassList=""
                    titleClassList="mb-5 font-mediun text-2xl"
                    menuClassList="flex flex-col gap-2"
                    data={menuBrands.items}
                />
                <Menu
                    title={"Популярные"}
                    containerClassList=""
                    titleClassList="mb-5 font-mediun text-2xl"
                    menuClassList="flex flex-col gap-2"
                    data={menuPopular.items}
                />
            </div>
            <div className={styles.bottom}>
                <Menu
                    data={menuDocs.items}
                    menuClassList="flex flex-col md:flex-row gap-3 md:ga-6 lg:gap-14"
                    menuItemClassList="lg:text-lg"
                />
            </div>
        </footer>
    );
}
