import { fetchWooCommerce } from "@/lib/utils";

const getCategories = async (query?: {}) => {
    const res = await fetchWooCommerce('products/categories', query);

    return res;
};

export default getCategories;