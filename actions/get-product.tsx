import { wooApi } from "@/lib/wc-rest-api";
import { ProductItem } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/acf/v3/options/options`;

const getProduct = async (id: number): Promise<ProductItem> => {
    const res = await wooApi.get(`products/${id}`);

    return res;
};

export default getProduct;