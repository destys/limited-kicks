import { IMenuItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IMainMenuItem {
    data: IMenuItem;
    onClose: () => void;
    setScroll?: (state: boolean) => void;
}

const MainMenuItem: React.FC<IMainMenuItem> = ({ data, onClose, setScroll }) => {
    const formattedUrl = data.url.replace('limited-kicks.ru/admin', 'limited-kicks.ru');
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        const next = !open;
        setOpen(next);
        setScroll && setScroll(next); // сообщаем MainMenu, что подменю открыто

    };

    return (
        <div>
            <div>
                {data.children?.length ? (
                    <button className="flex justify-between items-center gap-3 w-full p-4 border-b border-add_1 hover:bg-add_1_hv" onClick={handleToggle}>
                        {data.image && (
                            <div className="w-[45px] h-[45px] overflow-hidden">
                                <Image src={data.image} width={45} height={45} alt={data.title} className="w-full h-full object-contain" />
                            </div>
                        )}

                        <div className="flex items-center flex-auto">
                            <p className='flex-auto text-left'>{data.title}</p>
                            <div className={open ? "rotate-90" : "rotate-0"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" width={20} height={20}>
                                    <path stroke="#666" strokeLinecap="round" strokeLinejoin="round" d="M7.5 15l5-5-5-5"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                ) : (
                    <Link href={formattedUrl} className="flex justify-between items-center gap-3 w-full p-4 border-b border-add_1 hover:bg-add_1_hv" onClick={onClose}>
                        {data.image && (
                            <div className="w-[45px] h-[45px] overflow-hidden">
                                <Image src={data.image} width={45} height={45} alt={data.title} className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div className="flex items-center flex-auto">
                            <p className='flex-auto text-left'>{data.title}</p>
                            <div className={open ? "rotate-90" : "rotate-0"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" width={20} height={20}>
                                    <path stroke="#666" strokeLinecap="round" strokeLinejoin="round" d="M7.5 15l5-5-5-5"></path>
                                </svg>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            {open && (
                <div className={`relative pl-8 z-10 opacity-100`}>
                    {data.children?.map(item => (
                        <MainMenuItem key={item.id} data={item} onClose={onClose} />
                    ))}
                </div>
            )}

        </div >
    )
}

export default MainMenuItem