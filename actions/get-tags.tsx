import { fetchWooCommerce } from "@/lib/utils";

const getTags = async (query?: {}) => {
    const res = await fetchWooCommerce('products/tags', query);

    return res;
};

export default getTags;