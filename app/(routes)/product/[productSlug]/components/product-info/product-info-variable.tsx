"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import useOneClickModal from "@/hooks/use-one-click-modal";

import Dolayme from "../dolyame/Dolayme";
import ProductTabs from "../product-tabs/product-tabs";
import Button from "@/components/ui/button/button";
import Price from "@/components/price/price";

import styles from "./product-info.module.scss";
import { Product } from "@/types";
import useShoppingCart from "@/hooks/use-cart";
import Image from "next/image";
import useTableSizesModal from "@/hooks/use-sizes-table-modal";
import useToOrderModal from "@/hooks/use-to-order-modal";
import ym from "react-yandex-metrika";

interface ProductInfoProps {
  data: Product;
}

const ProductInfoVariable: React.FC<ProductInfoProps> = ({ data }) => {
  const oneClickModal = useOneClickModal();
  const toOrderModal = useToOrderModal();
  const SizesTableModal = useTableSizesModal();
  const cart = useShoppingCart();



  const minPrice = Math.min(
    ...data.variationsData
      .map((v) => Number(v.price))
      .filter((price) => price > 0)
  );

  const [isAdding, setIsAdding] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [entrySize, setEntrySize] = useState(data.variationsData[0]);
  const [entryPrice, setEntryPrice] = useState(minPrice > 0 ? minPrice : 0);
  const [isInStock, setIsInStock] = useState(data.variationsData[0].stock_status === 'instock');

  const brandsData = data?.brand ? data.brand : [];
  const sizesHeader = brandsData[0].acf.tablicza_razmerov_obuvi_dlya_czen?.header;
  const sizesBody = brandsData[0].acf.tablicza_razmerov_obuvi_dlya_czen?.body;

  const isToOrder = data.acf.tovary_pod_zakaz;

  const sizeMap = new Map<string, string[]>();
  sizesBody?.forEach(row => {
    const key = row[0]?.c; // Используем первый элемент для ключа
    if (key) {
      const sizes = row.map(item => item.c); // Создаем массив всех значений
      sizeMap.set(key, sizes);
    }
  });

  const variationsData = data.variationsData.map(variation => {
    const normalizedName = variation.name.replace(',', '.');
    const sizeArray = sizeMap.get(normalizedName);

    return {
      ...variation,
      name: sizeArray || [variation.name]
    };
  });

  useEffect(() => {
    const newDeliveryDate = new Date();
    newDeliveryDate.setDate(newDeliveryDate.getDate() + (isInStock ? 1 : 14));
    setDeliveryDate(formatDate(newDeliveryDate));
  }, [isInStock]);

  const handleSizeClick = (entrySize: any) => {
    setIsInStock(entrySize.stock_status === 'instock');
    setEntrySize(entrySize);
    setEntryPrice(entrySize.price)
  };

  const handleAddToCart = async () => {
    setIsAdding(true);

    if (typeof window !== 'undefined' && typeof ym !== 'undefined') {
      ym("100049821", 'reachGoal', 'added');
    }

    cart.addItem(
      {
        id: entrySize.id,
        slug: data.slug,
        name: data.name,
        quantity: 1,
        price: entrySize.price,
        image: data.images[0].src,
        entrySize: entrySize,
        sizeType: entrySize.name[activeSizeIndex],
      }
    );
  };

  return (
    <>
      {entrySize.price > 0 ? (
        <Price
          before=""
          value={entrySize.price}
          className="mb-5 sm:mb-7 lg:mb-10 xs:text-lg md:text-xl lg:text-2xl xl:text-3xl"
        />
      ) : (
        <div className="mb-5 sm:mb-7 lg:mb-10 xs:text-lg md:text-xl lg:text-2xl xl:text-3xl">Цена по запросу</div>
      )}
      <div className=" overflow-hidden">
        <div className={styles.sizes_type}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {sizesHeader?.map((item: { c: string }, index: number) => (
              <div key={`${item.c}-${index}`} className="min-w-0">
                <input
                  type="radio"
                  name="size-type"
                  id={`${item.c}-${index}`}
                  defaultChecked={index === 0}
                  onChange={() => setActiveSizeIndex(index)}
                />
                <label htmlFor={`${item.c}-${index}`} className="uppercase whitespace-nowrap">{item.c}</label>
              </div>
            ))}
          </div>
          <button className={styles.sizes_type__link} onClick={() => SizesTableModal.onOpen(brandsData[0].acf.tablicza_razmerov_obuvi)}>
            Таблица размеров
          </button>
        </div>
        <div className={styles.sizes}>
          {variationsData.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.item} ${item.stock_status === 'instock' && styles.instock}`}
              onClick={() => handleSizeClick(item)}
            >
              <input
                type="radio"
                name="size"
                id={`size_${item.id}`}
                defaultChecked={index === 0}
              />
              <label htmlFor={`size_${item.id}`}>
                <span className="absolute inset-0 size-full z-0">
                  {item.stock_status === 'instock' ?
                    <Image src="/instock.png" fill alt="calendar" className="max-md:size-4" priority unoptimized /> :
                    <Image src="/onorder.png" fill alt="calendar" className="max-md:size-4" priority unoptimized />
                  }
                </span>
                <div className="font-medium text-xs sm:text-sm md:text-base whitespace-nowrap relative z-20">
                  {item.name[activeSizeIndex]}
                </div>
                <Price
                  value={item.price}
                  className="text-xs whitespace-nowrap xs:text-sm md:text-base relative z-20"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4 lg:mb-7 text-xs xs:text-sm md:text-base lg:text-lg whitespace-nowrap">
          Товар будет доставлен{" "}
          <span className="text-main">{deliveryDate}</span>
        </div>
        <div className="my-5 text-xs xs:text-sm md:text-base lg:text-lg">
          {isToOrder && entrySize.price.toString() === '0' && <p>Стоимость и наличие эксклюзивной модели подтверждается в день заказа</p>}
          {isToOrder && entrySize.price.toString() !== '0' && <p>Стоимость и наличие эксклюзивной модели подтверждается в день заказа</p>}
        </div>
        {(isToOrder && !isInStock) || entrySize.price.toString() === "0" ? (
          <div className="mb-7">
            <Button
              type="button"
              styled={"filled"}
              className={"px-10 max-md:!px-1 py-5 bg-main border-main hover:border-black hover:bg-main max-md:w-full btn-shine"}
              onClick={() => toOrderModal.onOpen(data, entrySize.name[activeSizeIndex], entrySize, data.images[0])}
            >
              {isToOrder && entrySize.price.toString() === '0' && <>Запросить лучшую стоимость в России</>}
              {isToOrder && entrySize.price.toString() !== '0' && <>Подтвердить лучшую стоимость в России</>}

            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-7">
            <Button
              type="button"
              styled={"filled"}
              className={"px-10 py-5 btn-shine"}
              onClick={() => oneClickModal.onOpen(data, entrySize.name[activeSizeIndex], entrySize, data.images[0])}
            >
              Купить в один клик
            </Button>
            {!isAdding ? (
              <Button
                type="button"
                styled={"filled"}
                className={`py-5 px-10 bg-add_1 text-black hover:bg-main hover:border-main`}
                onClick={handleAddToCart}
              >
                В корзину
              </Button>
            ) : (
              <Button
                type="button"
                styled={"filled"}
                className={styles.toCartLink}
              >
                <Link href={'/cart'} className="block py-4 px-8">Оформить заказ</Link>
              </Button>
            )}

          </div>
        )}

        <Dolayme price={entryPrice} />
        <div className="mb-5 md:mb-7 lg:mb-11 h-[1px] bg-add_1"></div>
        <ProductTabs data={data} />

      </div>
    </>
  );
}

export default ProductInfoVariable;