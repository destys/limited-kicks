'use client'
import Link from "next/link";

import Price from "@/components/price/price";
import useShoppingCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Button from "@/components/ui/button/button";
import { useEffect, useState } from "react";


export default function Cart() {
  const cart = useShoppingCart();
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let total = 0;

    cart.items.map((item) => {
      total += item.price * item.quantity;
    })

    setCartTotal(total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.items])

  return (
    <div className="flex flex-col justify-center items-center min-h-80">
      <h1 className="mb-10 text-center">Корзина</h1>
      {cart.items.length ? (
        <div>
          {
            cart.items.map(item => (
              <CartItem key={item.entrySize?.id ? item.entrySize.id : item.id} data={item} />
            ))
          }
          <h3 className="flex justify-between items-center gap-3 mb-8 pt-5 border-t border-add_1 max-md:text-base">
            <span>Итого</span>
            <Price value={cartTotal} />
          </h3>
          <Link
            href={"checkout"}
            className="block w-full sm:w-fit sm:ml-auto py-4 px-6 rounded-[10px] border border-black transition-colors bg-black text-center text-white hover:bg-transparent hover:text-black"
          >
            Оформить заказ
          </Link>
        </div>) : (<div>
          <p>В данный момент корзина пуста!</p>
          <Button type="button" styled="filled" className="mx-auto"><Link href='/shop'>В каталог</Link></Button>
        </div>)}
    </div>
  );
}
