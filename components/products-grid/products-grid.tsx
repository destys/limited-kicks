"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Product, SingleImage } from "@/types";
import getProducts from "@/actions/get-products";
import ProductItem from "@/components/product-item/product-item";
import BannerCatalog from "@/components/banner-catalog/banner-catalog";
import { PacmanLoader } from "react-spinners";
import Skeleton from "../ui/skeleton/skeleton";
import { mergeParams } from "@/lib/utils";

interface ProductGridProps {
    initialProducts: Product[];
    query: {};
    searchParams: {
        orderby?: string;
    };
    banners: {
        banner_1?: SingleImage;
        banner_2?: SingleImage;
    };
}

const ProductGrid: React.FC<ProductGridProps> = ({
    query,
    searchParams,
    banners,
    initialProducts,
}) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(2); // Начинаем со второй страницы
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const hasMountedOnce = useRef(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const scrollElement = useRef<HTMLDivElement | null>(null);

    // Подгрузка новых товаров (на scroll)
    const loadMoreProducts = useCallback(async () => {
        if (loading || isLoading || !hasMore) return;

        setLoading(true);
        const combinedParams = mergeParams(query, searchParams);

        try {
            const newProducts = await getProducts({
                ...combinedParams,
                per_page: 12,
                page,
                ...(searchParams.orderby ? {} : { order: "desc", orderby: "date" }),
            });

            setProducts((prev) => [...prev, ...newProducts]);
            setHasMore(newProducts.length > 0);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to load more products:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, isLoading, hasMore, page, query, searchParams]);

    useEffect(() => {
        const el = scrollElement.current;
        if (!el || loading || isLoading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        let enabled = false;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const isVisible = entries[0].isIntersecting;

            if (isVisible && enabled) {
                loadMoreProducts();
            }
        };

        observer.current = new IntersectionObserver(observerCallback, {
            rootMargin: "100px", // чуть заранее
        });

        observer.current.observe(el);

        // Активируем observer после небольшого таймаута
        const timer = setTimeout(() => {
            enabled = true;
        }, 200); // достаточно 200 мс

        return () => {
            observer.current?.disconnect();
            clearTimeout(timer);
        };
    }, [loadMoreProducts, loading, isLoading, hasMore]);

    // Фильтры или сортировка: сброс списка
    useEffect(() => {
        const fetchFilteredProducts = async () => {
            setIsLoading(true);
            const combinedParams = mergeParams(query, searchParams);

            try {
                const newProducts = await getProducts({
                    ...combinedParams,
                    per_page: 12,
                    page: 1,
                });

                setProducts(newProducts);
                setPage(2);
                setHasMore(newProducts.length > 0);
                hasMountedOnce.current = false; // 🔥 сброс после фильтрации
            } catch (error) {
                console.error("Failed to fetch filtered products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilteredProducts();
    }, [searchParams, query]);

    return (
        <div className="relative min-h-screen">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 lg:gap-x-4 lg:gap-y-5 mb-10 relative">
                {products.map((item, index) => {
                    const showBanner1 = index + 1 === 9 && banners.banner_1;
                    const showBanner2 = index + 1 === 22 && banners.banner_2;

                    return (
                        <React.Fragment key={item.id + "-fragment"}>
                            {showBanner1 && (
                                <div className="flex justify-center items-center lg:col-span-2 lg:row-span-2">
                                    <BannerCatalog banner={banners.banner_1} />
                                </div>
                            )}
                            {showBanner2 && (
                                <div className="flex justify-center items-center lg:col-span-2 lg:row-span-2">
                                    <BannerCatalog banner={banners.banner_2} />
                                </div>
                            )}
                            <ProductItem key={item.id} data={item} />
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="flex justify-center mt-6" ref={scrollElement}>
                {loading && <PacmanLoader color="#2972FF" />}
            </div>
        </div>
    );
};

export default ProductGrid;