import { Attribute } from "@/types";
import getProducts from "@/actions/get-products";

import BannerCatalog from "@/components/banner-catalog/banner-catalog"

import TopBar from "../top-bar/top-bar"
import ProductItem from "../product-item/product-item"

interface IProductList {
    searchParams: any;
    categoryId: number;
}

const ProductsList: React.FC<IProductList> = async ({ searchParams, categoryId }) => {
    console.log('categoryId: ', categoryId);
    const products = await getProducts({
        category: categoryId,
        ...searchParams
    });

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
            <TopBar count={products.length} filters={filters} />
            <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 lg:gap-x-4 lg:gap-y-5">
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
        </>
    )
}

export default ProductsList