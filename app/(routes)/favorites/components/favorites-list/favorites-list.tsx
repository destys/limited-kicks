'use client';
import { useEffect, useState } from "react";
import { Product } from "@/types";

import getProducts from "@/actions/get-products";

import useFavoriteStore from "@/hooks/use-favorite";

import Loader from "@/components/ui/loader/loader";
import FavoritesItem from "../favorites-item/favorites-item";

const FavoritesList = () => {
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const { favorites } = useFavoriteStore();

    useEffect(() => {
        const fetchData = async () => {
            if (favorites.length) {
                setLoading(true);
                const products = await getProducts({ include: favorites.join() });
                console.log('favorites: ', favorites);
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
            <div className={`grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 gap-3 lg:gap-x-4 lg:gap-y-5 relative min-h-[320px]`}>
                {productsList.length ? productsList?.map(item => (
                    <FavoritesItem key={item.id} data={item} />
                )) : <p>Нет товаров в избранном</p>}
            </div>
        </div>
    )
}

export default FavoritesList