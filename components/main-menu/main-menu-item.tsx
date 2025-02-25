import { IMenuItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IMainMenuItem {
    data: IMenuItem;
    onClose: () => void;
}

const MainMenuItem: React.FC<IMainMenuItem> = ({ data, onClose }) => {
    const formattedUrl = data.url.replace('https://admin.limited-kicks.ru', '');
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div>
                {data.children?.length ? (
                    <button className="flex justify-between items-center gap-3 w-full p-4 border-b border-add_1 hover:bg-add_1_hv" onClick={() => setOpen(!open)}>
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
            <div className={`relative pl-8 ${open ? "z-10 h-auto opacity-100" : "z-[-1] h-0 opacity-0"}`}>
                {data.children?.map(item => (
                    <MainMenuItem key={item.id} data={item} onClose={onClose} />
                ))}
            </div>
        </div >
    )
}

export default MainMenuItem