'use client'
import { IFaqItem } from '@/types';
import { useState } from 'react';

import styles from './faq.module.scss'

interface InterfaceFaqItem {
    data: IFaqItem;
}

const FaqItem: React.FC<InterfaceFaqItem> = ({ data }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="mt-6 space-y-8 lg:mt-8 cursor-pointer" onClick={() => setActive(!active)}>
            <div className="p-8 bg-add_1 hover:bg-add_1_hv transition-colors rounded-lg">
                <div className="flex items-center justify-between w-full">
                    <h2 className="font-semibold">{data.vopros}</h2>

                    <span className="bg-gray-200 rounded-full">
                        {active ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>}

                    </span>
                </div>

                {active && <div dangerouslySetInnerHTML={{ __html: data.otvet }} className={styles.description} />}

            </div>
        </div>
    )
}

export default FaqItem