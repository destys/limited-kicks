"use client";
import { Brand } from "@/types";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/scrollbar';
import styles from "./brands.module.scss";

interface IBrands {
  data: Brand[];
}

const Brands: React.FC<IBrands> = ({ data }) => {
  return (
    <section>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={12}
        slidesPerView={2}
        speed={3000}
        loop={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        scrollbar={{
          hide: false,
        }}
        className={styles.slider}
        breakpoints={{
          474: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1268: {
            slidesPerView: 5,
          },
          1368: {
            slidesPerView: 6,
          },
          1921: {
            slidesPerView: 8,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id}>
            <Link href={`brand/${item.slug}`} className={styles.slide}>
              {item.acf?.logotip?.url ? (
                <Image
                  src={item.acf?.logotip.url}
                  width={200}
                  height={200}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <p>{item.name}</p>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Brands;