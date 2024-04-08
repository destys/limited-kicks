'use client'

import { ICartItem } from "@/types";
import { create } from "zustand";

interface ShoppingCartState {
    items: ICartItem[];
    addItem: (item: ICartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}

const useShoppingCart = create<ShoppingCartState>((set) => {
    const storedCart = typeof localStorage !== 'undefined' ? localStorage.getItem('shoppingCart') : null;
    const initialState = storedCart ? JSON.parse(storedCart) : { items: [] };

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
