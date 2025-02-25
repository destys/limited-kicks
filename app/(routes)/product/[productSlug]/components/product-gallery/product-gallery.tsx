"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./product-gallery.module.scss";
import SlidePrevButton from "@/components/ui/slider-navigations/slider-prev-button";
import SlideNextButton from "@/components/ui/slider-navigations/slider-next-button";
import { Product } from "@/types";
import useFavoriteStore from "@/hooks/use-favorite";
import FlagList from "@/components/flag-list/flag-list";
import useProductGalleryModal from "@/hooks/use-product-gallery-modal";
import { useViewedProducts } from "@/hooks/use-viewed-products";

interface ProductGalleryProps {
  productId: number;
  data: Product;
  flag?: string;
  flag_2?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ data }) => {
  const swiperRef = useRef<any>(null);
  const { onOpen } = useProductGalleryModal();

  const addProduct = useViewedProducts((state) => state.addProduct);

  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(data.id);

  useEffect(() => {
    // Добавляем товар в просмотренные при загрузке страницы
    addProduct(data);
  }, [data, addProduct]);

  const toggleFavorite = (id: number) => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const handleImageClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleOpenGallery = () => {
    onOpen(data.images);
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.top}>
        <div className="flex items-center gap-2">
          <button title="gallery" className="max-md:max-w-[38px]" onClick={handleOpenGallery}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                opacity="0.7"
                d="M13.4166 24.5C19.5377 24.5 24.4999 19.5378 24.4999 13.4167C24.4999 7.29551 19.5377 2.33334 13.4166 2.33334C7.29543 2.33334 2.33325 7.29551 2.33325 13.4167C2.33325 19.5378 7.29543 24.5 13.4166 24.5Z"
                stroke="#060F2F"
                strokeWidth="2"
              />
              <path
                d="M21.5833 21.5833L25.6666 25.6667"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10.5 13.4167H13.4167M13.4167 13.4167H16.3333M13.4167 13.4167V16.3333M13.4167 13.4167V10.5"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button title="favorite" className="max-md:max-w-[38px]" onClick={() => toggleFavorite(data.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                opacity="0.7"
                d="M14 6.41782L16.3333 8.75047"
                stroke={isFavorite ? "red" : "#060F2F"}
                strokeWidth="2"
                strokeLinecap="round"

              />
              <path
                d="M13.9999 6.4174L13.3695 7.02419C13.5344 7.19557 13.762 7.2924 13.9999 7.2924C14.2378 7.2924 14.4654 7.19557 14.6304 7.02419L13.9999 6.4174ZM10.997 21.3756C9.22871 19.9816 7.29517 18.6204 5.76126 16.8931C4.25734 15.1996 3.20825 13.2236 3.20825 10.66H1.45825C1.45825 13.7697 2.75384 16.1421 4.45276 18.0551C6.12169 19.9344 8.24915 21.4377 9.91358 22.7499L10.997 21.3756ZM3.20825 10.66C3.20825 8.15061 4.62618 6.04628 6.56167 5.16156C8.442 4.30206 10.9685 4.52968 13.3695 7.02419L14.6304 5.81062C11.7815 2.85078 8.47469 2.36296 5.83414 3.56996C3.24875 4.75174 1.45825 7.49587 1.45825 10.66H3.20825ZM9.91358 22.7499C10.5112 23.221 11.1527 23.7234 11.8029 24.1032C12.4528 24.483 13.1945 24.7917 13.9999 24.7917V23.0417C13.6387 23.0417 13.2137 22.9009 12.6858 22.5923C12.1581 22.2839 11.6107 21.8594 10.997 21.3756L9.91358 22.7499ZM18.0863 22.7499C19.7507 21.4377 21.8782 19.9344 23.5471 18.0551C25.246 16.1421 26.5416 13.7697 26.5416 10.66H24.7916C24.7916 13.2236 23.7425 15.1996 22.2386 16.8931C20.7046 18.6204 18.7711 19.9816 17.0029 21.3756L18.0863 22.7499ZM26.5416 10.66C26.5416 7.49587 24.7511 4.75174 22.1657 3.56996C19.5251 2.36296 16.2183 2.85078 13.3695 5.81062L14.6304 7.02419C17.0313 4.52968 19.5578 4.30206 21.4381 5.16156C23.3736 6.04628 24.7916 8.15061 24.7916 10.66H26.5416ZM17.0029 21.3756C16.3891 21.8594 15.8417 22.2839 15.3141 22.5923C14.7861 22.9009 14.3611 23.0417 13.9999 23.0417V24.7917C14.8054 24.7917 15.547 24.483 16.197 24.1032C16.8472 23.7234 17.4886 23.221 18.0863 22.7499L17.0029 21.3756Z"
                fill={isFavorite ? "red" : "#060F2F"}
              />
            </svg>
          </button>
        </div>
        <FlagList data={data} className="flex gap-2" />
      </div>
      <Swiper ref={swiperRef} resizeObserver={false} className="">
        {data.images.map((image) => (
          <SwiperSlide key={image.id} className="bg-white">
            <Image
              src={image.src}
              width={892}
              height={540}
              alt={image.name}
            />
          </SwiperSlide>
        ))}
        <div className="absolute right-0 bottom-3 lg:static flex justify-end items-center gap-2 pr-5">
          <SlidePrevButton />
          <SlideNextButton />
        </div>
        {data.images.length > 1 && (
          <div className={styles.thumbs}>
            {data.images.map((image, index) => (
              <div key={image.id} className={styles.item}>
                <Image
                  src={image.src}
                  width={438}
                  height={266}
                  alt={image.name}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        )}
      </Swiper>
    </div>
  );
}

export default ProductGallery;