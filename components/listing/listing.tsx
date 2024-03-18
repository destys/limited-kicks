'use client'

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import styles from "./listing.module.scss";
import "swiper/css";
import { Listing } from "@/types";
import SlidePrevButton from "../ui/slider-navigations/slider-prev-button";
import SlideNextButton from "../ui/slider-navigations/slider-next-button";
import ProductItem from "../product-item/product-item";
import React from "react";

const Listing: React.FC<Listing> = ({ data, title, titleTag }) => {
    return (
        <section>
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                speed={700}
                modules={[Navigation]}
                className="!flex flex-col-reverse"
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
                }}
            >
                <div className={styles.listing__top}>
                {title && React.createElement(titleTag || 'h2', { className: styles.listing__title }, title)}
                    <div className="flex items-center gap-10">
                        <Link href={"/products"} className={styles.listing__showMore}>
                            Смотреть все
                        </Link>
                        <div className={styles.listing__navigation}>
                            <SlidePrevButton />
                            <SlideNextButton />
                        </div>
                    </div>
                </div>
                {data?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductItem data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Listing