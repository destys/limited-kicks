"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import formatDate from "@/lib/utils";
import useOneClickModal from "@/hooks/use-one-click-modal";

import Dolayme from "../dolyame/Dolayme";
import ProductTabs from "../product-tabs/product-tabs";
import Button from "@/components/ui/button/button";
import Price from "@/components/price/price";

import styles from "./product-info.module.scss";
import { Product } from "@/types";

interface ProductInfoProps {
  data: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
  const oneClickModal = useOneClickModal();

  const brandsData = data?.brand;
  let sizeNames: string[][] = [];
  if (brandsData && brandsData.length > 0 && brandsData[0]?.acf?.tablicza_razmerov_obuvi) {
    sizeNames = brandsData[0].acf.tablicza_razmerov_obuvi.map((obj: {}) =>
      Object.keys(obj)
    );
  }
  const variationsData = data.variationsData;

  // Объединение массивов
  const combinedData = variationsData.map(variation => {
    const brandData = brandsData[0].acf.tablicza_razmerov_obuvi.find(data => data.eur === variation.name.replace(',', '.'));
    if (brandData) {
      const { ...rest } = brandData; // Включаем все данные из brandData в rest
      return {
        ...variation,
        ...rest // Добавляем все данные из brandData к variation
      };
    }
    return variation; // В случае, если данные не найдены
  });


  const [sizeType, setSizeType] = useState(sizeNames[0][0]);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [entrySize, setEntrySize] = useState(combinedData[0]);

  const [isInStock, setIsInStock] = useState(variationsData[0].stock_status === 'instock');
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const newDeliveryDate = new Date();
    newDeliveryDate.setDate(newDeliveryDate.getDate() + (isInStock ? 1 : 14));
    setDeliveryDate(formatDate(newDeliveryDate));
  }, [isInStock]);

  const handleSizeTypeChange = (newSizeType: string) => {
    setSizeType(newSizeType);
    setEntrySize(combinedData[selectedSizeIndex]);
  };

  const handleSizeClick = (stockStatus: boolean, entrySize: any, index: number) => {
    setIsInStock(stockStatus);
    setSelectedSizeIndex(index);
    setEntrySize(entrySize);
  };

  const oneClickAction = () => {
    oneClickModal.onOpen(data, sizeType, entrySize);
  };

  return (
    <>
      <div>
        <div className={styles.sizes_type}>
          <div className="flex items-center gap-2">
            {sizeNames[0].map((sizeName: string, index: number) => (
              <div key={`${sizeName}-${index}`}>
                <input
                  type="radio"
                  name="size-type"
                  id={sizeName}
                  checked={sizeType === sizeName}
                  onChange={() => handleSizeTypeChange(sizeName)}
                />
                <label htmlFor={sizeName} className="uppercase">{sizeName}</label>
              </div>
            ))}

          </div>
          <Link href={"#"} className={styles.sizes_type__link}>
            Таблица размеров
          </Link>
        </div>
        <div className={styles.sizes}>
          {combinedData?.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.item} ${item.stock_status === 'instock' && styles.instock}`}
              onClick={() => handleSizeClick(item.stock_status === 'instock', item, index)}
            >
              <input
                type="radio"
                name="size"
                id={`size_${item.id}`}
                defaultChecked={index === 0}
              />
              <label htmlFor={`size_${item.id}`}>
                <span className="absolute top-2.5 right-2.5 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1358_3308)">
                      <path
                        d="M1.1665 7.00001C1.1665 4.80012 1.1665 3.70018 1.84992 3.01676C2.53334 2.33334 3.63328 2.33334 5.83317 2.33334H8.1665C10.3664 2.33334 11.4664 2.33334 12.1497 3.01676C12.8332 3.70018 12.8332 4.80012 12.8332 7.00001V8.16668C12.8332 10.3665 12.8332 11.4665 12.1497 12.1499C11.4664 12.8333 10.3664 12.8333 8.1665 12.8333H5.83317C3.63328 12.8333 2.53334 12.8333 1.84992 12.1499C1.1665 11.4665 1.1665 10.3665 1.1665 8.16668V7.00001Z"
                        stroke="#060F2F"
                      />
                      <path
                        opacity="0.5"
                        d="M4.0835 2.33334V1.45834"
                        stroke="#060F2F"
                        strokeLinecap="round"
                      />
                      <path
                        opacity="0.5"
                        d="M9.9165 2.33334V1.45834"
                        stroke="#060F2F"
                        strokeLinecap="round"
                      />
                      <path
                        opacity="0.5"
                        d="M1.4585 5.25H12.5418"
                        stroke="#060F2F"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.5002 9.91668C10.5002 10.2389 10.239 10.5 9.91683 10.5C9.59465 10.5 9.3335 10.2389 9.3335 9.91668C9.3335 9.5945 9.59465 9.33334 9.91683 9.33334C10.239 9.33334 10.5002 9.5945 10.5002 9.91668Z"
                        fill="#060F2F"
                      />
                      <path
                        d="M10.5002 7.58333C10.5002 7.90551 10.239 8.16667 9.91683 8.16667C9.59465 8.16667 9.3335 7.90551 9.3335 7.58333C9.3335 7.26116 9.59465 7 9.91683 7C10.239 7 10.5002 7.26116 10.5002 7.58333Z"
                        fill="#060F2F"
                      />
                      <path
                        d="M7.58317 9.91668C7.58317 10.2389 7.32201 10.5 6.99984 10.5C6.67766 10.5 6.4165 10.2389 6.4165 9.91668C6.4165 9.5945 6.67766 9.33334 6.99984 9.33334C7.32201 9.33334 7.58317 9.5945 7.58317 9.91668Z"
                        fill="#060F2F"
                      />
                      <path
                        d="M7.58317 7.58333C7.58317 7.90551 7.32201 8.16667 6.99984 8.16667C6.67766 8.16667 6.4165 7.90551 6.4165 7.58333C6.4165 7.26116 6.67766 7 6.99984 7C7.32201 7 7.58317 7.26116 7.58317 7.58333Z"
                        fill="#060F2F"
                      />
                      <path
                        d="M4.66667 9.91668C4.66667 10.2389 4.4055 10.5 4.08333 10.5C3.76117 10.5 3.5 10.2389 3.5 9.91668C3.5 9.5945 3.76117 9.33334 4.08333 9.33334C4.4055 9.33334 4.66667 9.5945 4.66667 9.91668Z"
                        fill="#060F2F"
                      />
                      <path
                        d="M4.66667 7.58333C4.66667 7.90551 4.4055 8.16667 4.08333 8.16667C3.76117 8.16667 3.5 7.90551 3.5 7.58333C3.5 7.26116 3.76117 7 4.08333 7C4.4055 7 4.66667 7.26116 4.66667 7.58333Z"
                        fill="#060F2F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1358_3308">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div className="font-medium text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl whitespace-nowrap">
                  {item[sizeType]}
                </div>
                <Price
                  value={item.price}
                  className="text-xs xs:text-sm md:text-base"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4 lg:mb-7 text-xs xs:text-sm md:text-base lg:text-lg whitespace-nowrap">
          Товар будет доставлен{" "}
          <span className="text-main">{deliveryDate}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-7">
          <Button
            type="button"
            styled={"filled"}
            className={"px-10 py-5"}
            onClick={oneClickAction}
          >
            В один клик
          </Button>
          <Button
            type="button"
            styled={"filled"}
            className={"py-5 px-10 bg-add_1 text-black"}
          >
            В корзину
          </Button>
        </div>
        <Dolayme />
        <div className="mb-5 md:mb-7 lg:mb-11 h-[1px] bg-add_1"></div>
        <ProductTabs />
        <div className={styles.attributes}>
          <div className={styles.item}>
            <strong className="text-lg">SKU</strong>
            <span>DN3253-500</span>
          </div>
          <div className={styles.item}>
            <strong className="text-lg">Release date</strong>
            <span>August 2023</span>
          </div>
          <div className={styles.item}>
            <strong className="text-lg">Colorway</strong>
            <span>Titanium/Dark Smoke Gray-Sail</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;