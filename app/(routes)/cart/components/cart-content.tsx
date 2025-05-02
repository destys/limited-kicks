'use client';
import React, { useEffect, useState } from 'react'
import CartEmpty from './cart-empty'
import Link from 'next/link'
import Price from '@/components/price/price'
import CartItem from './cart-item'
import useShoppingCart from '@/hooks/use-cart'

const CartContent = () => {
    const cart = useShoppingCart();
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        let total = 0;

        cart.items.map((item) => {
            total += item.price * item.quantity;
        })

        setCartTotal(total);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    if (!cart.items.length) {
        return <CartEmpty />
    }

    return (
        <div>
            {cart.items.map((item) => (
                <CartItem key={item.entrySize?.id ? item.entrySize.id : item.id} data={item} />
            ))}
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
        </div>
    )
}

export default CartContent