import { Attribute } from "@/types";
import getProducts from "@/actions/get-products";
import getPage from "@/actions/get-page";

import Crumbs from "@/components/crumbs/crumbs";
import TopBar from "@/components/top-bar/top-bar";

import Categories from "./components/categories/categories";
import BrandsCatalog from "./components/brands-catalog/brands-catalog";
import NotFound from "@/app/not-found";
import ProductGrid from "@/components/products-grid/products-grid";
import { generateYoastMetadata } from "@/utils/meta-data";
import getAcfOptions from "@/actions/get-acf-options";
import getFilters from "@/actions/get-filters";

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
    const siteOptions = await getAcfOptions();
    if (!shop.length) {
        return <NotFound />
    }
    const filtersList = await getFilters({});

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
                <BrandsCatalog brandsArray={filtersList.attributes.find(
                    (attribute: Attribute) => attribute.name === 'Бренд')} />
                <TopBar count={1250} query={query} />
                <ProductGrid query={query} searchParams={searchParams} banners={siteOptions.acf.bannery_v_kataloge} />
            </section>
        </>
    );
}

export default ShopPage;
