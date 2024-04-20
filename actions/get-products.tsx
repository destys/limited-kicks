import { wooApi } from "@/lib/wc-rest-api";
import { Products } from "@/types";

const getProducts = async (query?: {}): Promise<Products[]> => {
    const res = await wooApi.get('products', query);
    return res.data;
};

export default getProducts;