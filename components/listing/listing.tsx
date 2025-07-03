'use client'

import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import ProductItem from "../product-item/product-item";
import SlidePrevButton from "../ui/slider-navigations/slider-prev-button";
import SlideNextButton from "../ui/slider-navigations/slider-next-button";

import { Product } from "@/types";

import "swiper/css";
import styles from "./listing.module.scss";

interface ListingProps {
    data: Product[];
    title: string;
    titleTag?: string;
    link?: string | undefined;
}

const Listing: React.FC<ListingProps> = ({ data, title, titleTag, link }) => {
    return (
        <section className={styles.listing}>
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                speed={700}
                modules={[Navigation]}
                className="!flex flex-col-reverse !pr-20 lg:!pr-0 !overflow-visible mt-10"
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
                    {title && React.createElement(titleTag || 'h2', { className: styles.listing__title }, title)}
                    <div className="flex items-center gap-10">
                        {!!link && !!link.length && <Link href={link} className={styles.listing__showMore}>
                            Смотреть все
                        </Link>}

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