"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./main-banner.module.scss";
import { Banners } from "@/types";

interface MainBannersProps {
  data: Banners[];
}

const MainBanner: React.FC<MainBannersProps> = ({ data }) => {
  return (
    <section className={styles.mainBanner}>
      <Swiper spaceBetween={24}>
        {data?.map((item) => (
          <SwiperSlide
            key={item.izobrazhenie.id}
            className={styles.mainBanner__slide}
          >
            <Image
              src={`${item.izobrazhenie.url}`}
              alt={item.izobrazhenie.alt || `banner-${item.izobrazhenie.id}`}
              width={item.izobrazhenie.width}
              height={item.izobrazhenie.height}
              className="w-full h-[440px] sm:rounded-2xl object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default MainBanner;
