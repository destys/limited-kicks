"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Product } from "@/types";
import getProducts from "@/actions/get-products";
import ProductItem from "@/components/product-item/product-item";
import BannerCatalog from "@/components/banner-catalog/banner-catalog";
import { PacmanLoader } from "react-spinners";

interface ProductGridProps {
    query: {};
    searchParams: {};
}

const ProductGrid: React.FC<ProductGridProps> = ({ query, searchParams }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(2); // Начинаем со второй страницы
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const mergeParams = (query: Record<string, any>, searchParams: Record<string, any>): Record<string, any> => {
        const merged: Record<string, any> = { ...query };

        Object.keys(searchParams).forEach(key => {
            if (Array.isArray(searchParams[key])) {
                if (Array.isArray(merged[key])) {
                    merged[key] = merged[key].concat(searchParams[key]);
                } else if (merged[key] !== undefined) {
                    merged[key] = [merged[key]].concat(searchParams[key]);
                } else {
                    merged[key] = searchParams[key];
                }
            } else {
                if (Array.isArray(merged[key])) {
                    merged[key] = merged[key].concat(searchParams[key]);
                } else if (merged[key] !== undefined) {
                    merged[key] = [merged[key], searchParams[key]];
                } else {
                    merged[key] = searchParams[key];
                }
            }
        });

        return merged;
    };

    useEffect(() => {
        const combinedParams = mergeParams(query, searchParams);
        const fetchInitialProducts = async () => {
            try {
                setIsLoading(true);
                const initialProducts = await getProducts(combinedParams);
                setProducts(initialProducts);
            } catch (error) {
                console.error('Failed to fetch initial products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialProducts();
    }, [searchParams, query]);

    const loadMoreProducts = useCallback(async () => {
        setLoading(true);
        const newProducts = await getProducts({ ...query, per_page: 12, page, ...searchParams });
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setHasMore(newProducts.length > 0);
        setLoading(false);
    }, [page, searchParams]);

    useEffect(() => {
        if (!loading) {
            loadMoreProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, loadMoreProducts]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (scrollElement.current) {
            observer.current.observe(scrollElement.current);
        }
    }, [loading, hasMore]);

    const scrollElement = useRef<HTMLDivElement | null>(null);

    return (
        <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 lg:gap-x-4 lg:gap-y-5 mb-10">
                {products.map((item, index) => (
                    (index + 1 === 9 || index + 1 === 22) ?
                        (<React.Fragment key={index + '-fragment'}>
                            <div className="col-span-2 row-span-2">
                                <BannerCatalog banner={null} />
                            </div>
                            <ProductItem key={item.id} data={item} />
                        </React.Fragment>)
                        : (<ProductItem key={item.id} data={item} />)
                ))}
            </div>
            <div className="flex justify-center mt-6" ref={scrollElement}>
                {loading && <PacmanLoader color="#2972FF" />}
            </div>
        </div>
    );
};

export default ProductGrid;