// ✅ ОБНОВЛЁННЫЙ КОМПОНЕНТ FilterList С ПОЛНОЙ РАБОТОЙ ПЕРЕСЧЁТА
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
import clsx from 'clsx';
import { mergeParams } from '@/lib/utils';
import Loader from '../ui/loader/loader';
import { PacmanLoader } from 'react-spinners';

interface IFiltersList {
    query: IProductsQuery;
    count: number;
    searchParams: {};
}

const FiltersList: React.FC<IFiltersList> = ({ query, count, searchParams }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Attribute[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [productCount, setProductCount] = useState(count);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showFilters) {
            document.body.classList.add('locked');
        } else {
            document.body.classList.remove('locked');
        }
    }, [showFilters])

    const router = useRouter();
    const pathname = usePathname();
    const newSearchParams = useSearchParams();

    useEffect(() => {
        if (window.innerWidth < 1024) {
            document.body.classList.toggle('locked', showFilters);
        }
    }, [showFilters]);

    useEffect(() => {
        const run = async () => {
            await updateProductCount(query);
        };
        run();
    }, [searchParams, query]);

    useEffect(() => {
        const fetchFilters = async () => {
            let params: Record<string, any> = {};

            if (query.category !== undefined) {
                params.categoryId = query.category;
            } else if (query.tag !== undefined) {
                params.tag = query.tag;
            } else if (query.attribute === 'pa_collections') {
                params.collection_id = query.attribute_term;
            } else if (query.attribute !== undefined) {
                params.brand_id = query.attribute_term;
            }

            try {
                const filtersList = await getFilters(params);
                setMinPrice(filtersList.min_price);
                setMaxPrice(filtersList.max_price);

                const customOrder = ['Коллекция', 'Категория', 'Бренд', 'Модель', 'Версия', 'Размер'];
                const filteredAttributes = filtersList.attributes.filter((attribute: { name: string }) => {
                    if (pathname.includes('/brand/') && attribute.name === 'Бренд') return false;
                    if (pathname.includes('/model/') && attribute.name === 'Модель') return false;
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

        const updateActiveFilters = () => {
            const active: string[] = [];
            const attributes = newSearchParams.getAll('attribute');
            const terms = newSearchParams.getAll('attribute_term');

            attributes.forEach((_, index) => {
                if (terms[index]) active.push(terms[index]);
            });

            setActiveFilters(active);
        };

        fetchFilters();
        updateActiveFilters();
    }, [query, newSearchParams]);

    const updateProductCount = async (query: IProductsQuery) => {
        try {
            setLoading(true);
            const combinedParams = mergeParams(query, searchParams);
            const response = await getProductsCount(combinedParams);
            setProductCount(response);
        } catch (error) {
            console.error('Failed to fetch product count:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (attributeName: string, termValue: any, isActive: boolean) => {
        const newQuery = new URLSearchParams(newSearchParams.toString());

        const attributes = newQuery.getAll('attribute');
        const terms = newQuery.getAll('attribute_term');
        newQuery.delete('attribute');
        newQuery.delete('attribute_term');

        attributes.forEach((attr, index) => {
            if (!(attr === attributeName && terms[index] === termValue && !isActive)) {
                newQuery.append('attribute', attr);
                newQuery.append('attribute_term', terms[index]);
            }
        });

        if (isActive) {
            newQuery.append('attribute', attributeName);
            newQuery.append('attribute_term', termValue);
        }

        const newPath = `${pathname}?${newQuery.toString()}`;
        router.replace(`${pathname}?${newQuery.toString()}`, { scroll: false });
    };

    const updatePriceFilter = (min: number, max: number) => {
        const newQuery = new URLSearchParams(newSearchParams.toString());
        newQuery.set('min_price', String(min));
        newQuery.set('max_price', String(max));
        const newPath = `${pathname}?${newQuery.toString()}`;
        router.replace(`${pathname}?${newQuery.toString()}`, { scroll: false });
    };

    const updateSortFilter = (sortValue: string) => {
        const newQuery = new URLSearchParams(newSearchParams.toString());
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
    };

    return (
        <div className="relative z-[8000]">
            <div className="block mb-6 pb-2 md:mb-11 md:pb-6 border-b relative z-[1000]">
                <div className="flex justify-between items-center gap-5">
                    <div className="whitespace-nowrap text-[10px] xs:text-xs sm:text-sm md:text-base">
                        <span className="font-light">Показано</span>{' '}
                        <strong className="font-medium"> {productCount} </strong>
                    </div>
                    <button
                        className="flex items-center gap-1.5 md:gap-3 py-3 px-5 pr-0 md:pr-5"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Image src={`/icons/Icon/${showFilters ? 'Filter' : 'ClosedFilters'}.svg`} width={28} height={28} alt="toggle filters" />
                        <span className="text-[10px] xs:text-xs sm:text-sm md:text-base">Фильтры</span>
                    </button>
                </div>

                {showFilters && (
                    <div className="fixed top-0 left-0 z-[8000] size-full flex justify-end items-end">
                        <div className="fixed top-0 left-0 z-[8001] size-full bg-black/30 " onClick={() => setShowFilters(false)}></div>
                        <div className="pb-10 md:mr-10 md:mb-10 relative z-[8002] rounded w-full max-h-[100dvh] overflow-y-auto md:h-auto max-w-lg shadow bg-white gap-3 px-3">
                            <div className={clsx("p-2.5 hidden", !!activeFilters.length && "my-5")}>
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


                            {!!filters.length && <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onChange={updatePriceFilter} />}
                            <div className="lg:col-span-3"></div>
                            <div className="md:space-y-3">
                                <SortFilter onChange={updateSortFilter} />

                                {filters.map((item) => (
                                    <FilterItem key={item.id} data={item} onChange={(name, val, active) => updateFilters(name, val, active)} />
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-5 px-2.5">
                                <Button styled="outlined" onClick={resetFilters}>Сбросить</Button>
                                <Button styled="filled" onClick={() => setShowFilters(false)} className="relative">
                                    {loading ? <PacmanLoader color='#fff' size={12} /> : <span>Применить {!!activeFilters.length && `(${productCount})`}</span>}
                                </Button>
                            </div>


                            <div className="absolute top-0 right-0 flex justify-center h-[52px]">
                                <button className="static p-3 rounded-full w-[52px] h-[52px]" onClick={() => setShowFilters(false)}>
                                    <Image src="/icons/Icon/Close.svg" width={30} height={30} alt="close" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div >
        </div >
    );
};

export default FiltersList;