import { fetchWooCommerce } from "@/lib/utils";
import { Products } from "@/types";
import getProductsCount from "./get-products-count";

// Типизация для параметров
interface QueryParams {
    [key: string]: string | number | Array<string | number>;
}

const buildUrlWithParams = (params: QueryParams): string => {
    const urlSearchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
            (params[key] as Array<string | number>).forEach((value) => {
                urlSearchParams.append(key, value.toString());
            });
        } else {
            urlSearchParams.append(key, params[key].toString());
        }
    });

    return urlSearchParams.toString();
};

const getProducts = async (query: QueryParams = {}): Promise<Products[]> => {
    const queryString = buildUrlWithParams(query);
    const res = await fetchWooCommerce(`products?${queryString}`);
    return res;
};

export default getProducts;
