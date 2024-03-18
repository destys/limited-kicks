import { wooApi } from "@/lib/wc-rest-api";
import { Product } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/acf/v3/options/options`;

const getProducts = async (query: {}): Promise<Product[]> => {
    const res = await wooApi.get('products', query);

    return res.data;
};

export default getProducts;