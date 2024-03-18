import { wooApi } from "@/lib/wc-rest-api";
import { Product } from "@/types";

const getProduct = async (id: number): Promise<Product> => {
    const res = await wooApi.get(`products/${id}`);

    return res;
};

export default getProduct;