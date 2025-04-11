'use client';

import useShoppingCart from "@/hooks/use-cart";
import { useEffect } from "react";

export const CartCleaner = () => {
    const { clearCart } = useShoppingCart();

    useEffect(() => {
        clearCart();
    }, []); // вызывается один раз при монтировании

    return null;
};