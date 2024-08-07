'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MobileLogo = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    // Функция для обработки скролла
    const handleScroll = () => {
        setScrolled(window.scrollY > 30);
    };

    // Проверяем начальное состояние скролла при загрузке страницы
    useEffect(() => {
        handleScroll(); // Проверяем скролл при первом рендере
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Функция для обработки нажатия кнопки назад
    const handleBack = () => {
        router.back();
    };

    return (
        <div className={`lg:hidden text-center fixed top-0 left-0 z-[9000] w-full transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="flex justify-center relative">
                {pathname !== '/' && <button onClick={handleBack} type="button" title="Назад" className="absolute top-[50%] left-2 z-50 w-9 h-9 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="#666" strokeLinecap="round" strokeLinejoin="round" d="M15.833 10H4.167M10 15.833L4.167 10 10 4.167"></path></svg>
                </button>}

                <Link href={'/'}>
                    <Image
                        src="/logo.svg"
                        alt="logotype"
                        width={151}
                        height={68}
                    />
                </Link>
            </div>
        </div>
    )
}

export default MobileLogo;