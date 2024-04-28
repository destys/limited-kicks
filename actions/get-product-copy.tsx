import { fetchWooCommerce } from "@/lib/utils";
import { wooApi } from "@/lib/wc-rest-api";
import { Product, Variation } from "@/types";


const getProductFetch = async (slug: string): Promise<Product> => {
    // const res = await wooApi.get('products', query);
    const res = await fetchWooCommerce(`products?slug=${slug}`);
    
    const product: Product = res[0];

    if (product.variations && product.variations.length > 0) {

        const variationsData = await Promise.all(product.variations.map(async (variationId: number) => {
            const variationRes = await wooApi.get(`products/${product.id}/variations/${variationId}`);
            return variationRes.data as Variation;
        }));

        product.variationsData = variationsData;
    }

    return product;
};

export default getProductFetch;