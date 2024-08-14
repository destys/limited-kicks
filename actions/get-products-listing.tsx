import { fetchWooCommerce } from "@/lib/utils";
import { Product, Products } from "@/types";

const getProductsListing = async (query: {}): Promise<Products[]> => {
    const res = await fetchWooCommerce('products', query);

    return res;
};

export default getProductsListing;
