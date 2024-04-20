import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Определяем интерфейс для состояния
interface FavoriteState {
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
}

// Создаём store с использованием TypeScript и persist middleware
const useFavoriteStore = create(
    persist<FavoriteState>(
        (set, get) => ({
            favorites: [],
            addFavorite: (id: number) => {
                const { favorites } = get();
                set({ favorites: Array.from(new Set([...favorites, id])) });
            },
            removeFavorite: (id: number) => {
                const { favorites } = get();
                set({ favorites: favorites.filter(favId => favId !== id) });
            },
        }),
        {
            name: 'favorite-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useFavoriteStore;
