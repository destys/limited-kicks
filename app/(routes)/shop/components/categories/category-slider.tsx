"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import CategoryItem from "./category-item";

import "swiper/css";
import "swiper/css/navigation";
import { Category } from "@/types";

interface CategorySliderProps {
    data: Category[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ data }) => {
    const sortedCategories = data.sort((a, b) => a.menu_order - b.menu_order);
    const filteredCategories = sortedCategories.filter((category: { count: number; }) => category.count > 0)
    const allCategory = {
        id: 0,
        name: "ВСЕ",
        slug: "shop",
        count: 1,
        menu_order: 0,
        image: {
            src: "/images/categories/all.svg",
            alt: "Все товары",
            name: "all.svg",
        }
    }
    return (
        <Swiper
            spaceBetween={8}
            slidesPerView={2}
            speed={700}
            modules={[Navigation]}
            className="!flex flex-col-reverse !pb-5"
            breakpoints={{
                480: {
                    slidesPerView: 3,
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 5,
                },
                1268: {
                    slidesPerView: 6,
                },
                1921: {
                    slidesPerView: 8,
                },
            }}
        >
            <SwiperSlide>
                <CategoryItem data={allCategory} />
            </SwiperSlide>
            {filteredCategories.map((item) => (
                <SwiperSlide key={item.id}>
                    <CategoryItem data={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CategorySlider