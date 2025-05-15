'use client';

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductItem from '../product-item/product-item';
import SlidePrevButton from '../ui/slider-navigations/slider-prev-button';
import SlideNextButton from '../ui/slider-navigations/slider-next-button';

import 'swiper/css';
import styles from './recent-viewed-listing.module.scss';
import { useViewedProducts } from '@/hooks/use-viewed-products';

const RecentViewedListing = () => {
    const viewedProducts = useViewedProducts((state) => state.viewedProducts);
    const loadViewedProducts = useViewedProducts((state) => state.loadViewedProducts);

    useEffect(() => {
        loadViewedProducts();
    }, []);

    if (!viewedProducts.length) {
        return null;
    }

    return (
        <section className={styles.listing}>
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                speed={700}
                modules={[Navigation]}
                className="!flex flex-col-reverse !pr-20 lg:!pr-0 !overflow-visible"
                breakpoints={{
                    474: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1921: { slidesPerView: 6 },
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
                {viewedProducts.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductItem data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default RecentViewedListing;