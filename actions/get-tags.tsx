import { wooApi } from "@/lib/wc-rest-api";

const getTags = async (query?: {}) => {
    const res = await wooApi.get('products/tags', query);

    return res.data;
};

export default getTags;