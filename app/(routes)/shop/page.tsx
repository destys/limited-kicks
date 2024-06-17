import { Attribute } from "@/types";
import getProducts from "@/actions/get-products";
import getPage from "@/actions/get-page";

import Crumbs from "@/components/crumbs/crumbs";
import ProductItem from "@/components/product-item/product-item";
import TopBar from "@/components/top-bar/top-bar";
import BannerCatalog from "@/components/banner-catalog/banner-catalog";

import Categories from "./components/categories/categories";
import BrandsCatalog from "./components/brands-catalog/brands-catalog";
import NotFound from "@/app/not-found";
import ScrollElement from "@/components/scroll-element/scroll-element";
import ProductGrid from "@/components/products-grid/products-grid";
import { generateYoastMetadata } from "@/utils/meta-data";

interface IShopPage {
    searchParams: {}
}

export async function generateMetadata() {
    const shop = await getPage("shop");
    if (!shop.length) {
        return <NotFound />
    }
    const yoast_head_json = shop[0].yoast_head_json;

    return generateYoastMetadata(yoast_head_json);
}

const ShopPage: React.FC<IShopPage> = async ({ searchParams }) => {
    console.log('searchParams: ', searchParams);
    const shop = await getPage("shop");

    if (!shop.length) {
        return <NotFound />
    }

    const initialProducts = await getProducts({ per_page: 12, page: 1, ...searchParams });


    const attributesMap = new Map();

    initialProducts.forEach(product => {
        product.attributes.forEach(attribute => {
            if (!attributesMap.has(attribute.id)) {
                attributesMap.set(attribute.id, {
                    id: attribute.id,
                    name: attribute.name,
                    slug: attribute.slug,
                    options: new Set(attribute.options)
                });
            } else {
                const existingAttr = attributesMap.get(attribute.id);
                attribute.options.forEach(option => existingAttr.options.add(option));
            }
        });
    });

    // Преобразуем Map в массив с атрибутами, где опции преобразованы из Set в Array
    const filters: Attribute[] = Array.from(attributesMap.values()).map(attr => ({
        id: attr.id,
        name: attr.name,
        slug: attr.slug,
        options: Array.from(attr.options)
    }));

    return (
        <>
            <section>
                <Crumbs data={shop[0]} />
                <h1 className="mb-10">{shop[0].title.rendered}</h1>
                <Categories />
                <BrandsCatalog />
                <TopBar count={initialProducts.length} filters={filters} />
                <ProductGrid initialProducts={initialProducts} searchParams={searchParams} />
            </section>
        </>
    );
}

export default ShopPage;
