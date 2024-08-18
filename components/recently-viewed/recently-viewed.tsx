'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import ProductItem from "../product-item/product-item";
import SlidePrevButton from "../ui/slider-navigations/slider-prev-button";
import SlideNextButton from "../ui/slider-navigations/slider-next-button";

import { Product } from "@/types";

import "swiper/css";
import styles from "./recently-viewed.module.scss";
import getProducts from "@/actions/get-products";
import Loader from "../ui/loader/loader";

const RecentlyViewed = () => {
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState<Product[]>([]);


    useEffect(() => {
        const productsId = localStorage.getItem('recently') || '';
        const fetchData = async () => {
            if (productsId) {
                setLoading(true);
                const products = await getProducts({ include: productsId, orderby: 'include' });
                setProductsList(products);
                setLoading(false);
            } else {
                setLoading(false);
                return null;
            }
        }
        fetchData();
    }, [])

    if (!productsList.length) {
        return null;
    }



    return (
        <section className="relative">
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                speed={700}
                modules={[Navigation]}
                className="!flex flex-col-reverse !pt-12 !pr-20 lg:!pr-0"
                breakpoints={{
                    474: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                    1921: {
                        slidesPerView: 6,
                    },
                }}
            >
                <div className={styles.listing__top}>
                    <h2 className={styles.listing__title}>Недавно посмотренные</h2>
                    <div className="flex items-center gap-10">
                        <div className={styles.listing__navigation}>
                            <SlidePrevButton />
                            <SlideNextButton />
                        </div>
                    </div>
                </div>
                {productsList?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductItem data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
}

export default RecentlyViewed