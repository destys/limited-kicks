'use client';

import React, { useEffect, useState } from 'react'

import { Product } from '@/types'
import getProducts from '@/actions/get-products'

import Crumbs from '@/components/crumbs/crumbs'
import FavoritesItem from '@/components/favorites-item/favorites-item'
import useFavoriteStore from '@/hooks/use-favorite';
import Loader from '@/components/ui/loader/loader';

const FavoritesPage = () => {
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState<Product[] | null>([]);
    const { favorites } = useFavoriteStore();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const products = await getProducts({ include: [favorites] });
            setProductsList(products);
            setLoading(false);
        }
        fetchData();
    }, [favorites])

    return (
        <section>
            <Crumbs data={{ title: { rendered: 'Избранное' } }} />
            <h1 className="mb-10 uppercase">Избранное</h1>
            {loading && <Loader />}
            <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 gap-3 lg:gap-x-4 lg:gap-y-5 relative min-h-[520px]">
                {productsList?.map(item => (
                    <FavoritesItem key={item.id} data={item} />
                ))}
            </div>

        </section>
    )
}

export default FavoritesPage