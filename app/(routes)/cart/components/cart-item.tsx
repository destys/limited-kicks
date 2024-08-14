import { useState } from "react";
import Image from "next/image";

import useShoppingCart from "@/hooks/use-cart";

import Price from "@/components/price/price";

import { ICartItem } from "@/types";
import Link from "next/link";

interface ICartItemData {
  data: ICartItem;
}

const CartItem: React.FC<ICartItemData> = ({ data }) => {
  const cart = useShoppingCart();
  const [count, setCount] = useState(data.quantity);

  // Функция, которая увеличивает count на 1
  const increment = () => {
    setCount(count + 1);
    cart.updateItemQuantity(data.id, count + 1);
  };

  // Функция, которая увеличивает count на 1
  const decrement = () => {
    setCount(count > 1 ? count - 1 : 1);
    cart.updateItemQuantity(data.id, count > 1 ? count - 1 : 1);
  };

  return (
    <div className="flex items-center justify-between gap-2 md:gap-5 lg:gap-10 mb-8 py-5 md:px-8">
      {/* image */}
      <div className="xs:min-w-[121px]">
        <Image
          src={data.image}
          alt="YEEZY BOOST 350 V2 SULFUR"
          width={238}
          height={143}
          className="max-h-[143px] object-contain"
          objectFit="contain"
        />
      </div>
      {/* product info */}
      <div className="flex-auto">
        <h3 className="max-md:text-base max-xs:text-xs mb-3 md:mb-6">
          <Link href={`product/${data.slug}`}>{data.name}</Link>
        </h3>
        {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-6"> */}
        <div className="grid sm:grid-cols-3 gap-3 lg:gap-6">
          <div>{data.entrySize && data.sizeType ? (
            <>
              <p className="mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base">
                Размер
              </p>
              <p className="font-medium text-xs xs:text-sm sm:text-base lg:text-xl uppercase">
                {data.entrySize[data.sizeType]} {data.sizeType}
              </p>
            </>) : ""}
          </div>
          {/* Количество */}
          <div className="flex gap-1 font-medium md:text-xl">
            <button
              className="flex justify-center items-center shrink-0 w-8 h-8 md:w-12 md:h-12 bg-add_1 rounded-lg"
              onClick={decrement}
            >
              -
            </button>
            <div className="flex justify-center items-center w-8 h-8 md:w-12 md:h-12">
              {count}
            </div>
            <button
              className="flex justify-center items-center shrink-0 w-8 h-8 md:w-12 md:h-12 bg-add_1 rounded-lg"
              onClick={increment}
            >
              +
            </button>
          </div>
          <div>
            <p className="mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base">
              Сумма
            </p>
            <Price
              value={count * data.price}
              className="font-medium text-xs xs:text-sm sm:text-base lg:text-xl"
            />
          </div>
        </div>
      </div>
      {/* actions */}
      <div>
        <button className="mb-3 block transition-opacity hover:opacity-60" onClick={() => cart.removeItem(data.id)}>
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:w-7 md:h-7"
          >
            <path
              d="M23.8337 23.8333L5.16699 5.16666M23.8337 5.16666L5.16699 23.8333"
              stroke="#060F2F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="block transition-opacity hover:opacity-60">
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:w-7 md:h-7"
          >
            <path
              opacity="0.7"
              d="M14.5 6.91782L16.8333 9.25047"
              stroke="#060F2F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M14.4997 6.91739L13.8692 7.52417C14.0342 7.69556 14.2618 7.79239 14.4997 7.79239C14.7376 7.79239 14.9652 7.69556 15.1301 7.52417L14.4997 6.91739ZM11.4967 21.8755C9.72846 20.4816 7.79492 19.1203 6.26101 17.3931C4.7571 15.6996 3.70801 13.7236 3.70801 11.1599H1.95801C1.95801 14.2697 3.25359 16.6421 4.95251 18.5551C6.62144 20.4344 8.74891 21.9377 10.4133 23.2499L11.4967 21.8755ZM3.70801 11.1599C3.70801 8.65059 5.12594 6.54626 7.06143 5.66154C8.94176 4.80205 11.4683 5.02966 13.8692 7.52417L15.1301 6.31061C12.2813 3.35076 8.97445 2.86294 6.33389 4.06994C3.7485 5.25173 1.95801 7.99586 1.95801 11.1599H3.70801ZM10.4133 23.2499C11.0109 23.721 11.6525 24.2233 12.3026 24.6032C12.9526 24.983 13.6942 25.2917 14.4997 25.2917V23.5417C14.1385 23.5417 13.7135 23.4008 13.1855 23.0923C12.6579 22.7839 12.1104 22.3594 11.4967 21.8755L10.4133 23.2499ZM18.586 23.2499C20.2504 21.9377 22.3779 20.4344 24.0469 18.5551C25.7458 16.6421 27.0413 14.2697 27.0413 11.1599H25.2913C25.2913 13.7236 24.2423 15.6996 22.7383 17.3931C21.2044 19.1203 19.2709 20.4816 17.5027 21.8755L18.586 23.2499ZM27.0413 11.1599C27.0413 7.99586 25.2509 5.25173 22.6654 4.06994C20.0249 2.86294 16.7181 3.35076 13.8692 6.31061L15.1301 7.52417C17.531 5.02966 20.0576 4.80205 21.9379 5.66154C23.8734 6.54626 25.2913 8.65059 25.2913 11.1599H27.0413ZM17.5027 21.8755C16.8889 22.3594 16.3415 22.7839 15.8138 23.0923C15.2859 23.4008 14.8609 23.5417 14.4997 23.5417V25.2917C15.3051 25.2917 16.0468 24.983 16.6967 24.6032C17.3469 24.2233 17.9884 23.721 18.586 23.2499L17.5027 21.8755Z"
              fill="#060F2F"
            />
          </svg>
        </button>
      </div>
    </div >
  );
}

export default CartItem;