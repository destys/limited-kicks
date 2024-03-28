import { wooApi } from "@/lib/wc-rest-api";
import { Product, Variation } from "@/types";


const getProduct = async (query?: {}): Promise<Product> => {
    const res = await wooApi.get('products', query);
    const product: Product = res.data[0];

    if (product.variations && product.variations.length > 0) {

        const variationsData = await Promise.all(product.variations.map(async (variationId: number) => {
            const variationRes = await wooApi.get(`products/${product.id}/variations/${variationId}`);
            return variationRes.data as Variation;
        }));

        product.variationsData = variationsData;
    }

    return product;
};

export default getProduct;