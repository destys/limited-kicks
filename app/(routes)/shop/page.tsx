import getProducts from "@/actions/get-products";

import ProductItem from "@/components/product-item/product-item";

import BrandsCatalog from "../category/[categorySlug]/components/brands-catalog/brands-catalog";
import TopBar from "../category/[categorySlug]/components/top-bar/top-bar";
import BannerCatalog from "../category/[categorySlug]/components/banner-catalog/banner-catalog";
import Categories from "../category/[categorySlug]/components/categories/categories";
import getPage from "@/actions/get-page";
import { Metadata, ResolvingMetadata } from "next";
import Crumbs from "@/components/crumbs/crumbs";

export async function generateMetadata() {
    const shop = await getPage("8");
    const yoast_head_json = shop.yoast_head_json;

    return {
        title: yoast_head_json.title, // Если у продукта есть свое собственное название, используйте его, в противном случае используйте название из yoast_head_json
        description: yoast_head_json.description,
        canonical: yoast_head_json.canonical,
        openGraph: {
            type: yoast_head_json.og_type,
            locale: yoast_head_json.og_locale,
            url: yoast_head_json.og_url,
            title: yoast_head_json.og_title,
            description: yoast_head_json.og_description,
            site_name: yoast_head_json.og_site_name,
        },
        twitter: {
            cardType: yoast_head_json.twitter_card,
        },
    }
}

export default async function ShopPage() {
    const shop = await getPage("8");
    const products = await getProducts();
    return (
        <section>
            <Crumbs />
            <h1 className="mb-10">{shop.title.rendered}</h1>
            <Categories />
            <BrandsCatalog />
            <TopBar count={products.length} />

            <div className="grid lg:grid-cols-4 lg:gap-x-4 lg:gap-y-5">
                {products?.map((item, index) => (
                    <div
                        key={item.id}
                        className={
                            index + 1 === 9 || index + 1 === 22 ? "col-span-2 row-span-2" : ""
                        }
                    >
                        {index + 1 === 9 && <BannerCatalog />}
                        <ProductItem data={item} />
                        {index + 1 === 22 && <BannerCatalog />}
                    </div>
                ))}
            </div>
        </section>
    );
}

