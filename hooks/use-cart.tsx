'use client'

import { ICartItem, ICoupon } from "@/types";
import { create } from "zustand";

interface ShoppingCartState {
    items: ICartItem[];
    coupon: ICoupon | null;
    addItem: (item: ICartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    addCoupon: (coupon: ICoupon) => void;
    removeCoupon: () => void;
}

const useShoppingCart = create<ShoppingCartState>((set) => {
    const storedCart = typeof localStorage !== 'undefined' ? localStorage.getItem('shoppingCart') : null;
    const storedCartObject = storedCart ? JSON.parse(storedCart) : null;
    const storedCoupon = storedCartObject && storedCartObject.coupon !== undefined ? storedCartObject.coupon : null;

    const initialState = storedCart
        ? { ...storedCartObject, coupon: storedCoupon }
        : { items: [], coupon: null };

    return {
        ...initialState,

        addItem: (item) =>
            set((state) => {
                const existingItemIndex = state.items.findIndex((existingItem) => existingItem.id === item.id);

                const updatedItems = existingItemIndex !== -1
                    ? state.items.map((existingItem, index) => index === existingItemIndex ? { ...existingItem, quantity: existingItem.quantity + 1 } : existingItem)
                    : [...state.items, { ...item, quantity: 1 }];

                localStorage.setItem('shoppingCart', JSON.stringify({ items: updatedItems }));
                return { items: updatedItems };
            }),
        addCoupon: (coupon: ICoupon) => {
            set({ coupon: coupon })
        },
        removeCoupon: () => {
            set({ coupon: null })
        },
        removeItem: (id) =>
            set((state) => {
                const newItems = state.items.filter((item) => item.id !== id);
                localStorage.setItem('shoppingCart', JSON.stringify({ items: newItems }));
                return { items: newItems };
            }),

        updateItemQuantity: (id, quantity) =>
            set((state) => {
                const updatedItems = state.items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                );
                localStorage.setItem('shoppingCart', JSON.stringify({ items: updatedItems }));
                return { items: updatedItems };
            }),

        clearCart: () => {
            localStorage.removeItem('shoppingCart');
            set({ items: [] });
        },
    };
});

export default useShoppingCart;
