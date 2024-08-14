"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import styles from "./ticker.module.scss";

const Ticker = () => {
    const data = [
        {
            id: 1,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 2,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 3,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 4,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 5,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 6,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 7,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 8,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 9,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 10,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 11,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
        {
            id: 12,
            icon: "Fire.svg",
            title: "Скидка 90% на первый заказ",
        },
    ];
    return (
        <section className="px-0 md:py-3 bg-add_1">
            <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                speed={3000}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
                className={styles.slider}
            >
                {data.map((item) => (
                    <SwiperSlide className="px-5 py-3 !w-auto" key={item.id}>
                        <div className=" flex items-center gap-3">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M23.3333 15.2963C23.3333 23.5926 16.2815 25.6667 12.7555 25.6667C9.67037 25.6667 3.5 23.5926 3.5 15.2963C3.5 12.0511 5.20505 9.87161 6.83662 8.62696C7.74481 7.93414 8.90213 8.62397 9.01853 9.76031L9.11867 10.7378C9.24061 11.9281 10.3242 12.904 11.3275 12.252C13.2928 10.9749 14 7.9044 14 6.22223V5.84466C14 4.17667 15.6844 3.10316 17.036 4.08062C20.0262 6.24315 23.3333 10.015 23.3333 15.2963Z"
                                    stroke="#060F2F"
                                    strokeWidth="2"
                                />
                                <path
                                    opacity="0.5"
                                    d="M9.33325 21.5186C9.33325 24.8371 12.237 25.6667 13.6888 25.6667C14.9592 25.6667 17.4999 24.8371 17.4999 21.5186C17.4999 20.2341 16.8124 19.3669 16.1471 18.8665C15.6827 18.5173 15.0299 18.8309 14.8701 19.3895C14.662 20.1177 13.9099 20.5753 13.5267 19.9219C13.1764 19.3244 13.1764 18.4283 13.1764 17.889C13.1764 17.1463 12.4295 16.6655 11.8286 17.1021C10.6242 17.9773 9.33325 19.4618 9.33325 21.5186Z"
                                    stroke="#060F2F"
                                    strokeWidth="2"
                                />
                            </svg>
                            <p className="text-sm whitespace-nowrap">{item.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Ticker