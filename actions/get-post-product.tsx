import { fetchWooCommerce } from "@/lib/utils";
import { Product, Variation } from "@/types";


const getPostProduct = async (query: { id: number }): Promise<Product | null> => {
    if (!query.id) return null;

    const { id, ...rest } = query;
    const res = await fetchWooCommerce(`products/${id}`, rest); // правильный endpoint

    const product: Product = res;

    if (product.variations && product.variations.length > 0) {
        const variationsData = await Promise.all(product.variations.map(async (variationId: number) => {
            const variationRes = await fetchWooCommerce(`products/${product.id}/variations/${variationId}`);
            return variationRes as Variation;
        }));

        product.variationsData = variationsData;
    }

    return product;
};

export default getPostProduct;