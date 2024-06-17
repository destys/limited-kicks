"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Product } from "@/types";
import getProducts from "@/actions/get-products";
import ProductItem from "@/components/product-item/product-item";
import BannerCatalog from "@/components/banner-catalog/banner-catalog";
import ScrollElement from "@/components/scroll-element/scroll-element";
import { PacmanLoader } from "react-spinners";

interface ProductGridProps {
    initialProducts: Product[];
    searchParams: {};
}

const ProductGrid: React.FC<ProductGridProps> = ({ initialProducts, searchParams }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(2); // Начинаем со второй страницы
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const loadMoreProducts = useCallback(async () => {
        setLoading(true);
        const newProducts = await getProducts({ per_page: 24, page, ...searchParams });
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setHasMore(newProducts.length > 0);
        setLoading(false);
    }, [page, searchParams]);

    useEffect(() => {
        if (!loading) {
            loadMoreProducts();
        }
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
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 lg:gap-x-4 lg:gap-y-5">
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
        </>
    );
};

export default ProductGrid;