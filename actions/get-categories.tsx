import { wooApi } from "@/lib/wc-rest-api";

const getCategories = async (query?: {}) => {
    const res = await wooApi.get('products/categories', query);

    return res.data;
};

export default getCategories;