"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import BlogItem from "../blog-item/blog-item";
import SlidePrevButton from "../ui/slider-navigations/slider-prev-button";
import SlideNextButton from "../ui/slider-navigations/slider-next-button";

import { BlogSLider } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./blog-slider.module.scss";



const BlogSlider: React.FC<BlogSLider> = ({ data }) => {

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      speed={700}
      modules={[Navigation]}
      className="!flex flex-col-reverse"
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      <div className="absolute top-[-100%] right-0 flex items-center gap-10">
        <Link href={"/blog"} className={styles.blog__showMore}>
          Смотреть все
        </Link>
        <div className={styles.blog__navigation}>
          <SlidePrevButton />
          <SlideNextButton />
        </div>
      </div>
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          <BlogItem data={item} id={0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BlogSlider;