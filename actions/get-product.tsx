import { fetchWooCommerce } from "@/lib/utils";
import { Product, Variation } from "@/types";


const getProduct = async (query: {}): Promise<Product> => {
    console.log('query: ', query);

    const res = await fetchWooCommerce('products', query);

    const product: Product = res[0];

    if (product.variations && product.variations.length > 0) {

        const variationsData = await Promise.all(product.variations.map(async (variationId: number) => {
            const variationRes = await fetchWooCommerce(`products/${product.id}/variations/${variationId}`);
            return variationRes as Variation;
        }));

        product.variationsData = variationsData;
    }

    return product;
};

export default getProduct;