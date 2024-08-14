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
    const shop = await getPage("shop");

    if (!shop.length) {
        return <NotFound />
    }


    const query = {
        per_page: 12,
        page: 1,
    };

    return (
        <>
            <section>
                <Crumbs data={shop[0]} />
                <h1 className="mb-10">{shop[0].title.rendered}</h1>
                <Categories />
                <BrandsCatalog />
                <TopBar count={1250} query={query} />
                <ProductGrid query={query} searchParams={searchParams} />
            </section>
        </>
    );
}

export default ShopPage;
