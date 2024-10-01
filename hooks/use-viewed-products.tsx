// store/useViewedProducts.ts
import { create } from 'zustand';
import { Product } from '@/types';

// Типы для состояния
interface ViewedProductsState {
    viewedProducts: Product[];
    addProduct: (product: Product) => void;
    loadViewedProducts: () => void; // Функция для загрузки из localStorage
}

// Ключ для хранения данных в localStorage
const LOCAL_STORAGE_KEY = 'viewedProducts';

export const useViewedProducts = create<ViewedProductsState>((set) => ({
    viewedProducts: [],
    
    // Добавление продукта и сохранение в localStorage
    addProduct: (product: Product) => 
        set((state) => {
            // Проверка на существование продукта
            const existingProduct = state.viewedProducts.find((p) => p.id === product.id);
            const updatedProducts = existingProduct
                ? state.viewedProducts
                : [product, ...state.viewedProducts].slice(0, 8); // Храним последние 8 товаров

            // Сохранение обновленных товаров в localStorage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));

            return { viewedProducts: updatedProducts };
        }),
    
    // Загрузка просмотренных товаров из localStorage
    loadViewedProducts: () => {
        const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedProducts) {
            set({ viewedProducts: JSON.parse(storedProducts) });
        }
    }
}));