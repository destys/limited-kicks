import { wooApi } from "@/lib/wc-rest-api";
import { Product } from "@/types";

const getProducts = async (query?: {}): Promise<Product[]> => {
    const res = await wooApi.get('products', query);

    return res.data;
};

export default getProducts;