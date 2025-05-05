"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import styles from "./ticker.module.scss";
import getAcfOptions from "@/actions/get-acf-options";
import { useEffect, useState } from "react";
import { SingleImage } from "@/types";
import Image from "next/image";

const Ticker = () => {
    const [tickers, setTikers] = useState<{ ikonka: SingleImage; tekst: string }[]>([]);


    useEffect(() => {
        const fetchTickers = async () => {
            const response = await getAcfOptions();
            setTikers(response.acf.begushhaya_stroka);
        }
        fetchTickers();
    }, [])

    if (!tickers.length) return null;

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
                {tickers.map((item, index) => (
                    <SwiperSlide className="px-5 py-3 !w-auto" key={item.tekst + '-' + index}>
                        <div className="flex items-center gap-3">
                            <Image src={item.ikonka.url} alt="icon" width={28} height={28} />

                            <p className="text-sm whitespace-nowrap">{item.tekst}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Ticker