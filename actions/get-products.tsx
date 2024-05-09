import { fetchWooCommerce } from "@/lib/utils";
import { Products } from "@/types";

const getProducts = async (query?: {}): Promise<Products[]> => {
    const res = await fetchWooCommerce('products', query);
    
    return res;
};

export default getProducts;