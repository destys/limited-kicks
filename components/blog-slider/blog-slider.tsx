"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import BlogItem from "../blog-item/blog-item";
import SlidePrevButton from "../ui/slider-navigations/slider-prev-button";
import SlideNextButton from "../ui/slider-navigations/slider-next-button";

import { Post } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./blog-slider.module.scss";

interface BlogSliderProps {
  data: Post[];
}

const BlogSlider: React.FC<BlogSliderProps> = ({ data }) => {

  return (
    <section className={styles.blog}>
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
          1921: {
            slidesPerView: 6,
        },
        }}
      >
        <div className={styles.blog__top}>
          <h2 className={styles.blog__title}>Блог</h2>
          <div className="flex items-center gap-10">
            <Link href={"/blog"} className={styles.blog__showMore}>
              Смотреть все
            </Link>
            <div className={styles.blog__navigation}>
              <SlidePrevButton />
              <SlideNextButton />
            </div>
          </div>
        </div>
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <BlogItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default BlogSlider;