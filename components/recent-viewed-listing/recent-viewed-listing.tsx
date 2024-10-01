// components/recent-viewed-listing/recent-viewed-listing.tsx
'use client';

import React from 'react';
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

    if (!viewedProducts.length) {
        return <p className={styles.noProducts}>Нет просмотренных товаров</p>;
    }

    return (
        <section className={styles.listing}>
            <div className={styles.listing__top}>
                <h2 className={styles.listing__title}>Недавно смотрели</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {viewedProducts.map((product) => (
                    <ProductItem key={product.id} data={product} />
                ))}
            </div>
        </section>
    );
};

export default RecentViewedListing;