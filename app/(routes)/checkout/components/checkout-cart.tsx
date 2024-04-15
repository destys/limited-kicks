'use client';
import React, { Suspense, useEffect, useState } from 'react'
import useShoppingCart from '@/hooks/use-cart';
import dynamic from 'next/dynamic';

const CartItem = dynamic(() => import('../../cart/components/cart-item'), {
    ssr: false
});

import Price from '@/components/price/price';

const CheckoutCart = () => {
    const [cartTotal, setCartTotal] = useState(0);
    const cart = useShoppingCart();



    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="hidden 2xl:block col-span-3">
                <h1 className="mb-5 lg:mb-10 text-center">Корзина</h1>
                <div>
                    {cart.items.map(item => (
                        <CartItem key={item.entrySize?.id ? item.entrySize.id : item.id} data={item} />
                    ))}
                </div>
                <h3 className="flex justify-between items-center gap-3 mb-8 pt-5 border-t border-add_1 max-md:text-base">
                    <span>Итого</span>
                    <Price value={cartTotal} />
                </h3>
            </div>
        </Suspense>
    )
}

export default CheckoutCart