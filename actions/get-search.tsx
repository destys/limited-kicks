import { wooApi } from "@/lib/wc-rest-api";
import { Products } from "@/types";

const getSearch = async (query: string): Promise<Products[]> => {
    const res = await wooApi.get(`products?search=${query}`);

    return res.data;
};

export default getSearch;