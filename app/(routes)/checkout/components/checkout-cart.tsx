'use client';
import React, { Suspense, useEffect, useState } from 'react'
import useShoppingCart from '@/hooks/use-cart';
import dynamic from 'next/dynamic';

const CartItem = dynamic(() => import('../../cart/components/cart-item'), {
    ssr: false
});

import Price from '@/components/price/price';
import Promocode from '@/components/promocode/promocode';
import Image from 'next/image';

const CheckoutCart = () => {
    const [cartTotal, setCartTotal] = useState(0);
    const cart = useShoppingCart();

    useEffect(() => {
        let total = 0;

        cart.items.map((item) => {
            total += item.price * item.quantity;
        })

        setCartTotal(total);
    }, [cart.items])

    const handleRemoveCoupon = () => {
        cart.removeCoupon()
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="lg:col-span-4 2xl:col-span-3">
                <h1 className="mb-5 lg:mb-10 text-center">Корзина</h1>
                <div>
                    {cart.items.map(item => (
                        <CartItem key={item.entrySize?.id ? item.entrySize.id : item.id} data={item} />
                    ))}
                </div>
                <Promocode />
                <div>
                    {cart.coupon && <h4 className="flex justify-between items-center gap-3 mb-5 pt-5 border-t border-add_1 max-md:text-base">
                        <p>Скидка</p>
                        <div className="flex items-center gap-2">
                            {cart.coupon.discount_type === 'percent' ? (
                                <>
                                    <Price value={+cart.coupon.amount / 100 * cartTotal} />
                                    <button type="button" onClick={handleRemoveCoupon}>
                                        <Image src={"Icon/Close.svg"} width={24} height={24} alt="Удалить" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Price value={+cart.coupon.amount} />
                                    <button type="button" onClick={handleRemoveCoupon}>
                                        <Image src={"Icon/Close.svg"} width={24} height={24} alt="Удалить" />
                                    </button>
                                </>
                            )}

                        </div>
                    </h4>}

                    <h3 className="flex justify-between items-center gap-3 mb-8 pt-5 border-t border-add_1 max-md:text-base">
                        {cart.coupon ? (
                            <>
                                {cart.coupon.discount_type === 'percent' ? (
                                    <>
                                        <span>Итого</span>
                                        <Price value={cartTotal - (+cart.coupon.amount / 100 * cartTotal)} oldValue={cartTotal} />
                                    </>
                                ) : (
                                    <>
                                        <span>Итого</span>
                                        <Price value={cartTotal - +cart.coupon.amount} oldValue={cartTotal} />
                                    </>
                                )}

                            </>
                        ) : (
                            <>
                                <span>Итого</span>
                                <Price value={cartTotal} />
                            </>
                        )}
                    </h3>
                </div>

            </div >
        </Suspense >
    )
}

export default CheckoutCart