"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import { BRANDS } from "./brands.data";

import "swiper/css";
import styles from "./brands.module.scss";

const Brands = () => {
  return (
    <section>
      <Swiper
        spaceBetween={12}
        slidesPerView={2}
        speed={3000}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
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
        }}
      >
        {BRANDS.map((item, index) => (
          <SwiperSlide key={item.id}>
            <Link href="#" className={styles.slide}>
              <Image
                src={`/images/brands/${item.image}`}
                width={200}
                height={200}
                alt={`brand-${index}`}
                className="w-full h-full object-contain"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Brands;