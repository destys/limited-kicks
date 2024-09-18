'use client';
import React, { useEffect, useState } from 'react';
import FilterItem from './filter-item';
import PriceFilter from './price-filter';
import { SortFilter } from './sort-filter';
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
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
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

                setMinPrice(filtersList.min_price);
                setMaxPrice(filtersList.max_price);

                const customOrder = ['Бренд', 'Модель', 'Размер', 'Коллекция']; // Задайте желаемый порядок фильтров

                const filteredAttributes = filtersList.attributes.filter((attribute: { name: string; }) => {
                    if (pathname.includes('/brand/') && attribute.name === 'Бренд') {
                        return false; // Скрываем фильтр по бренду
                    }
                    if (pathname.includes('/tag/') && attribute.name === 'Модель') {
                        return false; // Скрываем фильтр по модели
                    }
                    return true; // Оставляем все остальные фильтры
                });

                // Сортировка фильтров согласно customOrder
                const sortedFiltersList = filteredAttributes.sort((a: { name: string; }, b: { name: string; }) => {
                    return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
                });
                setFilters(sortedFiltersList);
            } catch (error) {
                console.error('Failed to fetch filters:', error);
            }
        };
        fetchFilters();
    }, [query]);

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

    const updatePriceFilter = (min: number, max: number) => {
        const newQuery = new URLSearchParams(searchParams);
        newQuery.set('min_price', min.toString());
        newQuery.set('max_price', max.toString());

        // Обновить URL
        const newPath = `${pathname}?${newQuery.toString()}`;
        router.push(newPath, { scroll: false });
    };

    // Обновление сортировки
    const updateSortFilter = (sortValue: string) => {
        const newQuery = new URLSearchParams(searchParams);

        // Устанавливаем параметры сортировки
        if (sortValue === 'default') {
            newQuery.delete('orderby');
            newQuery.delete('order');
        } else {
            newQuery.set('orderby', 'price'); // Сортируем по цене
            newQuery.set('order', sortValue); // Значение может быть 'asc' или 'desc'
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
                        <Image src="/icons/Icon/ClosedFilters.svg" width={28} height={28} alt="closed filters" />
                    )}

                    <span className="text-[10px] xs:text-xs sm:text-sm md:text-base">
                        Фильтры и сортировка
                    </span>
                </button>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full z-[1000] ${showFilters ? "block lg:hidden" : "hidden"}`} onClick={() => setShowFilters(!showFilters)}></div>
            <div className={`fixed top-0 right-0 z-[10000] w-full h-full max-w-96 shadow lg:shadow-none lg:max-w-none bg-white lg:bg-transparent lg:static lg:grid-cols-5 gap-3 items-center flex-wrap lg:mt-6 ${showFilters ? "block lg:grid" : "hidden"}`}>
                <div className="flex justify-end pr-5  h-[70px] lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                    <Image src="/icons/Icon/Close.svg" width={30} height={30} alt="close" />
                </div>

                {/* Добавляем фильтр по цене */}
                {filters.length && <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onChange={updatePriceFilter} />}
                <div className="lg:col-span-3"></div>

                {/* Добавляем фильтр сортировки */}
                <SortFilter onChange={updateSortFilter} />

                {/* Существующие фильтры */}
                {filters.map(item => (
                    <FilterItem key={item.id} data={item} onChange={(attributeName, termValue, isActive) => updateFilters(attributeName, termValue, isActive)} />
                ))}
            </div>
        </div>
    );
}

export default FiltersList;