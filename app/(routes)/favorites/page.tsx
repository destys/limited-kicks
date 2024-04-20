import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import Crumbs from '@/components/crumbs/crumbs'
import FavoritesItem from '@/components/favorites-item/favorites-item'
import React from 'react'

type Props = {}

const FavoritesPage = async (props: Props) => {
    const products = await getProducts({ include: "35, 199, 202" });
    return (
        <section>
            <Crumbs />
            <h1 className="mb-10 uppercase">Избранное</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 lg:gap-x-4 lg:gap-y-5">
                {products.map(item => (
                    <FavoritesItem key={item.id} data={item} />
                ))}
            </div>
        </section>
    )
}

export default FavoritesPage