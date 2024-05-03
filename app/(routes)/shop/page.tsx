import getProducts from "@/actions/get-products";
import getPage from "@/actions/get-page";

import Crumbs from "@/components/crumbs/crumbs";
import ProductItem from "@/components/product-item/product-item";
import Categories from "./components/categories/categories";
import BrandsCatalog from "./components/brands-catalog/brands-catalog";
import TopBar from "../../../components/top-bar/top-bar";
import BannerCatalog from "./components/banner-catalog/banner-catalog";
import { Attribute } from "@/types";

export async function generateMetadata() {
    const shop = await getPage("shop");
    const yoast_head_json = shop[0].yoast_head_json;

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
    const shop = await getPage("shop");
    const products = await getProducts();

    const attributesMap = new Map();

    products.forEach(product => {
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
                <TopBar count={products.length} filters={filters} />

                <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 lg:gap-x-4 lg:gap-y-5">
                    {products?.map((item, index) => (
                        (index + 1 === 9 || index + 1 === 22) ?
                            (<>
                                <div key={index + '-banner'} className="col-span-2 row-span-2">
                                    <BannerCatalog banner={null} />
                                </div>
                                <ProductItem key={item.id} data={item} />
                            </>)
                            : (<ProductItem key={item.id} data={item} />)
                    ))}
                </div>
            </section>
        </>
    );
}

