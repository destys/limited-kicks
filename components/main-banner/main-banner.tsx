"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"

import "swiper/css";
import styles from "./main-banner.module.scss";
import { Banners } from "@/types";

interface MainBannersProps {
  data: Banners[];
}

const MainBanner: React.FC<MainBannersProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize(); // Проверяем сразу при загрузке
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <section className={styles.mainBanner}>
      <Swiper spaceBetween={24} autoplay={{ delay: 3000, disableOnInteraction: false }} modules={[Autoplay]}>
        {data?.map((item) => (
          <SwiperSlide key={item.izobrazhenie.id} className={styles.mainBanner__slide}>
            <Image
              src={isMobile && item.izobrazhenie_mobile ? item.izobrazhenie_mobile.url : item.izobrazhenie.url}
              alt={item.izobrazhenie.alt || `banner-${item.izobrazhenie.id}`}
              width={isMobile && item.izobrazhenie_mobile ? item.izobrazhenie_mobile.width : item.izobrazhenie.width}
              height={isMobile && item.izobrazhenie_mobile ? item.izobrazhenie_mobile.height : item.izobrazhenie.height}
              className="w-full h-[440px] 2xl:h-[660px] sm:rounded-2xl object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default MainBanner;
