"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import useOneClickModal from "@/hooks/use-one-click-modal";

import Dolayme from "../dolyame/Dolayme";
import ProductTabs from "../product-tabs/product-tabs";
import Button from "@/components/ui/button/button";

import styles from "./product-info.module.scss";
import { Product } from "@/types";
import useShoppingCart from "@/hooks/use-cart";
import Price from "@/components/price/price";
import useToOrderModal from "@/hooks/use-to-order-modal";

interface ProductInfoProps {
  data: Product;
}

const ProductInfoSimple: React.FC<ProductInfoProps> = ({ data }) => {
  const [isInStock, setIsInStock] = useState(data.stock_status === 'instock');
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const cart = useShoppingCart();
  const oneClickModal = useOneClickModal();
  const toOrderModal = useToOrderModal();

  const isToOrder = data.acf.tovary_pod_zakaz;

  useEffect(() => {
    const newDeliveryDate = new Date();
    newDeliveryDate.setDate(newDeliveryDate.getDate() + (isInStock ? 1 : 14));
    setDeliveryDate(formatDate(newDeliveryDate));
  }, [isInStock]);

  const handleAddToCart = () => {
    setIsAdding(true);

    cart.addItem({
      id: data.id,
      slug: data.slug,
      name: data.name,
      quantity: 1,
      price: data.price,
      image: data.images[0].src,
    })
  }

  return (
    <>
      {data.price > 0 ? (
        <Price
          before=""
          value={data.price}
          className="mb-5 sm:mb-7 lg:mb-10 text-xs xs:text-sm sm:text-base lg:text-lg"
        />
      ) : (
        <div className="mb-5 sm:mb-7 lg:mb-10 text-xs xs:text-sm sm:text-base lg:text-lg">Цена по запросу</div>
      )}
      <div>
        <div className="mb-4 lg:mb-7 text-xs xs:text-sm md:text-base lg:text-lg whitespace-nowrap">
          Товар будет доставлен{" "}
          <span className="text-main">{deliveryDate}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-7">
          {(isToOrder && !isInStock) || data.price === 0 ? (
            <div className="mb-7">
              <Button
                type="button"
                styled={"filled"}
                className={"px-10 py-5 hover:bg-main hover:border-main"}
                onClick={() => toOrderModal.onOpen(data, "", {}, data.images[0])}
              >
                Запросить стоимость
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-7">
              <Button
                type="button"
                styled={"filled"}
                className={"px-10 py-5"}
                onClick={() => oneClickModal.onOpen(data, "", {}, data.images[0])}
              >
                Купить в один клик
              </Button>
              {!isAdding ? (
                <Button
                  type="button"
                  styled={"filled"}
                  className={`btn-shine py-5 px-10 bg-add_1 text-black hover:bg-main hover:border-main`}
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
        </div>
        <Dolayme price={data.price} />
        <div className="mb-5 md:mb-7 lg:mb-11 h-[1px] bg-add_1"></div>
        <ProductTabs data={data} />
      </div>
    </>
  );
}

export default ProductInfoSimple;