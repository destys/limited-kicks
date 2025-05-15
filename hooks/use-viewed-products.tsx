import { create } from 'zustand';
import { Product } from '@/types';

interface ViewedProductsState {
    viewedProducts: Product[];
    addProduct: (product: Product) => void;
    loadViewedProducts: () => void;
}

const LOCAL_STORAGE_KEY = 'viewedProducts';

export const useViewedProducts = create<ViewedProductsState>((set) => ({
    viewedProducts: [],

    addProduct: (product: Product) =>
        set((state) => {
            const exists = state.viewedProducts.find((p) => p.id === product.id);
            const updated = exists
                ? state.viewedProducts
                : [product, ...state.viewedProducts].slice(0, 8);

            if (typeof window !== 'undefined') {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
            }

            return { viewedProducts: updated };
        }),

    loadViewedProducts: () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    set({ viewedProducts: Array.isArray(parsed) ? parsed : [] });
                } catch (e) {
                    console.error('Ошибка парсинга viewedProducts из localStorage');
                }
            }
        }
    }
}));