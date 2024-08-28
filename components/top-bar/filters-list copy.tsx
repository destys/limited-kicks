'use client';

import React, { useEffect, useState } from 'react';
import FilterItem from './filter-item';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Attribute, IProductsQuery } from '@/types';
import getFilters from '@/actions/get-filters';
import Image from 'next/image';

interface IFiltersList {
    query: IProductsQuery;
    count: number;
}

const FiltersList: React.FC<IFiltersList> = ({ query, count }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Attribute[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchFilters = async () => {
            let params = {};
            try {
                if (query.category !== undefined) {
                    params = {
                        categoryId: query.category
                    }
                } else if (query.tag !== undefined) {
                    params = {
                        tag: query.tag
                    }
                } else if (query.attribute !== undefined) {
                    params = {
                        brand_id: query.attribute_term
                    }
                };

                const filtersList = await getFilters(params);

                const customOrder = ['Бренд', 'Модель', 'Размер', 'Коллекция']; // Задайте желаемый порядок фильтров

                // Сортировка фильтров согласно customOrder
                const sortedFiltersList = filtersList.sort((a: { name: string; }, b: { name: string; }) => {
                    return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
                });
                setFilters(sortedFiltersList);
            } catch (error) {
                console.error('Failed to fetch filters:', error);
            }
        };
        fetchFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const updateFilters = (attributeName: string, termValue: any, isActive: boolean) => {
        const newQuery = new URLSearchParams(searchParams);

        // Формирование ключей для параметров
        const attributeKey = `attribute`;
        const termKey = `attribute_term`;

        // Удалить текущий атрибут и его значения
        const existingAttributes = newQuery.getAll(attributeKey);
        const existingTerms = newQuery.getAll(termKey);
        newQuery.delete(attributeKey);
        newQuery.delete(termKey);

        // Пересобрать параметры, исключая удаленный, если он неактивен
        existingAttributes.forEach((attr, index) => {
            if (!(attr === attributeName && existingTerms[index] === termValue && !isActive)) {
                newQuery.append(attributeKey, attr);
                newQuery.append(termKey, existingTerms[index]);
            }
        });

        // Добавить новый атрибут, если он активен
        if (isActive) {
            newQuery.append(attributeKey, attributeName);
            newQuery.append(termKey, termValue);
        }

        // Обновить URL
        const newPath = `${pathname}?${newQuery.toString()}`;
        router.push(newPath, { scroll: false });
    };

    return (
        <div className="block mb-6 pb-2 md:mb-11 md:pb-6 border-b">
            <div className="flex justify-between items-center gap-5">
                <div className="whitespace-nowrap text-[10px] xs:text-xs sm:text-sm md:text-base">
                    <span className="font-light">Товаров в категории</span>{" "}
                    <strong className="font-medium"> {count} </strong>
                </div>
                <button
                    className="flex items-center gap-1.5 md:gap-3 py-3 px-5 pr-0 md:pr-5"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? (
                        <Image src="/icons/Icon/Filter.svg" width={28} height={28} alt="open filters" />
                    ) : (
                        <Image src="/icons/Icon/ClosedFilter.svg" width={28} height={28} alt="closed filters" />
                    )}

                    <span className="text-[10px] xs:text-xs sm:text-sm md:text-base">
                        Фильтры и сортировка
                    </span>
                </button>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full z-[1000] ${showFilters ? "block lg:hidden" : "hidden"}`} onClick={() => setShowFilters(!showFilters)}></div>
            <div className={`fixed top-0 right-0 z-[1001] w-full h-full max-w-96 shadow lg:shadow-none lg:max-w-none bg-white lg:bg-transparent lg:static lg:grid-cols-5 gap-3 items-baseline flex-wrap lg:mt-6 ${showFilters ? "block lg:grid" : "hidden"}`}>
                <div className="flex justify-end pr-5  h-[70px] lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                    <Image src="/icons/Icon/Close.svg" width={30} height={30} alt="close" />
                </div>
                {filters.map(item => (
                    <FilterItem key={item.id} data={item} onChange={(attributeName, termValue, isActive) => updateFilters(attributeName, termValue, isActive)} />
                ))}
            </div>
        </div >
    );
}

export default FiltersList;
