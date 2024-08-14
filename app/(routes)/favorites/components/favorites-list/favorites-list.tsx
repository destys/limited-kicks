'use client';
import { useEffect, useState } from "react";
import { Product } from "@/types";

import getProducts from "@/actions/get-products";

import useFavoriteStore from "@/hooks/use-favorite";

import Loader from "@/components/ui/loader/loader";
import FavoritesItem from "../favorites-item/favorites-item";
import RecentlyViewed from "@/components/recently-viewed/recently-viewed";

const FavoritesList = () => {
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const { favorites } = useFavoriteStore();

    useEffect(() => {
        const fetchData = async () => {
            if (favorites.length) {
                setLoading(true);
                const products = await getProducts({ include: favorites.join() });
                setProductsList(products);
                setLoading(false);
            } else {
                setProductsList([])
                setLoading(false);
            }
        }
        fetchData();
    }, [favorites])
    return (
        <div className='relative'>
            {loading && <Loader />}
            <div className={`grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 gap-3 lg:gap-x-4 lg:gap-y-5 mb-16 relative`}>
                {productsList.length ? productsList?.map(item => (
                    <FavoritesItem key={item.id} data={item} />
                )) : <p className="col-span-2 text-center lg:text-left">В избранном пусто. Добавляйте товары с помощью ❤️</p>}
            </div>
            <RecentlyViewed />
        </div>
    )
}

export default FavoritesList