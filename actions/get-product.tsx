import { wooApi } from "@/lib/wc-rest-api";
import { Product } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/acf/v3/options/options`;

const getProduct = async (id: number): Promise<Product> => {
    const res = await wooApi.get(`products/${id}`);

    return res;
};

export default getProduct;