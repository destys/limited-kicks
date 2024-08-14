'use client';
import useMainMenu from '@/hooks/use-main-menu';
import Image from 'next/image'

const MenuButton = () => {
    const { onOpen } = useMainMenu();
    return (
        <button
            className="hidden lg:block mr-3 lg:mr-5 2xl:mr-11"
            onClick={onOpen}
        >
            <Image src="/icons/Icon/menu-burger.svg" alt="menu-icon" width={24} height={24} />
        </button>
    )
}

export default MenuButton