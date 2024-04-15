'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";



import { Product, Products } from "@/types";

import "swiper/css";
import styles from "./search-listing.module.scss";
import SlidePrevButton from "@/components/ui/slider-navigations/slider-prev-button";
import SlideNextButton from "@/components/ui/slider-navigations/slider-next-button";
import ProductItem from "@/components/product-item/product-item";
import Loader from "@/components/ui/loader/loader";
import getSearch from "@/actions/get-search";
import { useSearchParams } from "next/navigation";

interface ListingProps {
}

const SearchListing: React.FC<ListingProps> = () => {

    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResuts] = useState<Products[]>([]);

    const searchParams = useSearchParams()
    const search = searchParams.get('s')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getSearch(search || '');
            setSearchResuts(res)
            setLoading(false);
        }
        fetchData();
    }, [search]);

    return (
        <section className="relative min-h-[400px]">
            {loading && <Loader />}

            <div className={styles.listing__top}>
                <h2 className={styles.listing__title}>Результаты поиска по запросу: {search}</h2>
            </div>

            <div className="grid lg:grid-cols-4 lg:gap-x-4 lg:gap-y-5">
                {searchResults?.map((item) => (
                    <ProductItem data={item} key={item.id} />
                ))}
            </div>

        </section>
    );
}

export default SearchListing