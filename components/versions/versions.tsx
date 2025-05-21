'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './versions.module.scss';
import getAttributes from '@/actions/get-attributes';
import { Attribute } from '@/types';

interface Props {
    versionsArray: Attribute;
}

interface AttributeOption {
    id: number;
    name: string;
}

const Versions = ({ versionsArray }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [options, setOptions] = useState<AttributeOption[]>([]);

    const selectedTerms = searchParams.getAll('attribute_term').map(Number);

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const list = await getAttributes(versionsArray.id);
                const filtered = list.filter((item: AttributeOption) =>
                    versionsArray.options.includes(item.id)
                );
                setOptions(filtered);
            } catch (error) {
                console.error('Ошибка при загрузке атрибутов:', error);
            }
        };

        fetchAttributes();
    }, [versionsArray]);

    const handleVersionClick = (termId: number) => {
        const currentTerms = new Set(searchParams.getAll('attribute_term').map(Number));

        if (currentTerms.has(termId)) {
            currentTerms.delete(termId);
        } else {
            currentTerms.add(termId);
        }

        const newQuery = new URLSearchParams();

        currentTerms.forEach(() => {
            newQuery.append('attribute', 'pa_versiya');
        });

        currentTerms.forEach((id) => {
            newQuery.append('attribute_term', id.toString());
        });

        router.push(`${pathname}?${newQuery.toString()}`, { scroll: false });
    };

    return (
        <div className={styles.tagCloud__list}>
            {options.map((item) => {
                const isSelected = selectedTerms.includes(item.id);
                return (
                    <div
                        key={item.id}
                        className={`flex items-center gap-3 w-fit flex-shrink-0 py-3 px-5 rounded-lg lg:hover:bg-add_1_hv text-sm lg:text-base cursor-pointer
              ${isSelected ? 'bg-black text-white' : 'bg-add_1'}`}
                        onClick={() => handleVersionClick(item.id)}
                    >
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Versions;