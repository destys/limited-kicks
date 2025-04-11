'use client';
import React, { useEffect, useState } from 'react';
import FilterItem from './filter-item';
import PriceFilter from './price-filter';
import { SortFilter } from './sort-filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Attribute, IProductsQuery } from '@/types';
import getFilters from '@/actions/get-filters';
import Image from 'next/image';
import getProductsCount from '@/actions/get-products-count';
import Button from '../ui/button/button';

interface IFiltersList {
    query: IProductsQuery;
    count: number;
}

const FiltersList: React.FC<IFiltersList> = ({ query, count }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Attribute[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [productCount, setProductCount] = useState(count);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (window.innerWidth < 1024) {
            if (showFilters) {
                document.body.classList.add('locked');
            } else {
                document.body.classList.remove('locked');
            }
        }
    }, [showFilters])

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
                } else if (query.attribute === 'pa_collections') {
                    params = {
                        collection_id: query.attribute_term
                    }
                } else if (query.attribute !== undefined) {
                    params = {
                        brand_id: query.attribute_term
                    }
                };

                const filtersList = await getFilters(params);

                setMinPrice(filtersList.min_price);
                setMaxPrice(filtersList.max_price);

                const customOrder = ['Категория', 'Бренд', 'Модель', 'Версия', 'Размер', 'Коллекция'];

                const filteredAttributes = filtersList.attributes.filter((attribute: { name: string; }) => {
                    if (pathname.includes('/brand/') && attribute.name === 'Бренд') {
                        return false;
                    }
                    if (pathname.includes('/tag/') && attribute.name === 'Модель') {
                        return false;
                    }
                    return true;
                });

                const sortedFiltersList = filteredAttributes.sort((a: { name: string; }, b: { name: string; }) => {
                    return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
                });
                setFilters(sortedFiltersList);
            } catch (error) {
                console.error('Failed to fetch filters:', error);
            }
        };
        fetchFilters();

        // Обновляем активные фильтры при изменении параметров в URL
        const updateActiveFilters = () => {
            const active: React.SetStateAction<string[]> = [];
            const attributeKey = `attribute`;
            const termKey = `attribute_term`;

            const attributes = searchParams.getAll(attributeKey);
            const terms = searchParams.getAll(termKey);

            attributes.forEach((attr, index) => {
                active.push(`${terms[index]}`);
            });

            setActiveFilters(active);
        };

        updateActiveFilters();
    }, [query, searchParams]);

    // Функция для пересчета количества товаров
    const updateProductCount = async (query: string) => {
        try {
            /* const params = new URLSearchParams(searchParams.toString()); */
            const response = await getProductsCount(query);
            setProductCount(response.count);
        } catch (error) {
            console.error('Failed to fetch product count:', error);
        }
    };

    const updateFilters = (attributeName: string, termValue: any, isActive: boolean, termName: string) => {
        const newQuery = new URLSearchParams(searchParams.toString());

        const attributeKey = `attribute`;
        const termKey = `attribute_term`;

        const existingAttributes = newQuery.getAll(attributeKey);
        const existingTerms = newQuery.getAll(termKey);
        newQuery.delete(attributeKey);
        newQuery.delete(termKey);

        existingAttributes.forEach((attr, index) => {
            if (!(attr === attributeName && existingTerms[index] === termValue && !isActive)) {
                newQuery.append(attributeKey, attr);
                newQuery.append(termKey, existingTerms[index]);
            }
        });

        if (isActive) {
            newQuery.append(attributeKey, attributeName);
            newQuery.append(termKey, termValue);
        }

        const newPath = `${pathname}?${newQuery.toString()}`;
        router.push(newPath, { scroll: false });
        updateProductCount(newQuery.toString());
    };

    const updatePriceFilter = (min: number, max: number) => {
        const newQuery = new URLSearchParams(searchParams.toString());
        newQuery.set('min_price', min.toString());
        newQuery.set('max_price', max.toString());

        const newPath = `${pathname}?${newQuery.toString()}`;
        router.push(newPath, { scroll: false });

        updateProductCount(newQuery.toString());
    };

    const updateSortFilter = (sortValue: string) => {
        const newQuery = new URLSearchParams(searchParams.toString());

        if (sortValue === 'default') {
            newQuery.delete('orderby');
            newQuery.delete('order');
        } else {
            newQuery.set('orderby', 'price');
            newQuery.set('order', sortValue);
        }

        const newPath = `${pathname}?${newQuery.toString()}`;
        router.push(newPath, { scroll: false });
    };

    const resetFilters = () => {
        router.push(pathname, { scroll: false });
        updateProductCount('');
    };

    const applyFilters = () => {
        setShowFilters(false);
    };

    return (
        <div className="relative z-[8000]">
            <div className="block mb-6 pb-2 md:mb-11 md:pb-6 border-b relative z-[1000] lg:static">
                <div className="flex justify-between items-center gap-5">
                    <div className="whitespace-nowrap text-[10px] xs:text-xs sm:text-sm md:text-base">
                        <span className="font-light">Показано</span>{" "}
                        <strong className="font-medium"> {productCount} </strong>
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
                            Фильтры
                        </span>
                    </button>
                </div>
                <div className={`fixed top-0 left-0 w-full h-full bg-black/10 ${showFilters ? "block lg:hidden" : "hidden"}`} onClick={() => setShowFilters(!showFilters)}></div>
                <div className={`fixed bottom-[52px] left-1/2 -translate-x-1/2 z-[9000] rounded w-full h-auto max-w-lg shadow lg:shadow-none lg:max-w-none bg-white lg:bg-transparent lg:translate-x-0 lg:static lg:grid-cols-5 gap-3 items-center flex-wrap lg:mt-6 ${showFilters ? "block lg:grid" : "hidden"}`}>
                    <div className="mt-5 mb-10 p-2.5 lg:hidden">
                        {!!activeFilters.length && (
                            <>
                                <p className="mb-2">Примененные фильтры</p>
                                <ul className="flex flex-wrap gap-2">
                                    {activeFilters.map((filter, index) => (
                                        <li key={index} className="flex justify-center items-center gap-2 py-1 px-2 rounded-xl bg-add_1">
                                            <span>{filter}</span>
                                            <button>
                                                <Image src="/icons/Icon/Close.svg" width={10} height={10} alt="close" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    {filters.length && <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onChange={updatePriceFilter} />}
                    <div className="lg:col-span-3"></div>

                    <SortFilter onChange={updateSortFilter} />

                    {filters.map(item => (
                        <FilterItem key={item.id} data={item} onChange={(attributeName, termValue, isActive, termName) => updateFilters(attributeName, termValue, isActive, termName)} />
                    ))}
                    <div className="grid grid-cols-2 gap-4 my-5 px-2.5 lg:hidden">
                        <Button styled="outlined" onClick={resetFilters}>Сбросить</Button>
                        <Button styled="filled" onClick={applyFilters}>Применить {!!activeFilters.length && `(${productCount})`}</Button>
                    </div>

                    <div className="relative flex justify-center lg:hidden h-[52px]">
                        <div className="absolute top-1/2 p-3 rounded-full bg-white shadow w-[52px] h-[52px]" onClick={() => setShowFilters(!showFilters)}>
                            <Image src="/icons/Icon/Close.svg" width={30} height={30} alt="close" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltersList;