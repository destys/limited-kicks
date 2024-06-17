import { fetchWooCommerce } from "@/lib/utils";
import { Products } from "@/types";

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
    console.log('query: ', query);
    const queryString = buildUrlWithParams(query);
    console.log('queryString: ', queryString);
    const res = await fetchWooCommerce(`products?${queryString}`);
    return res;
};

export default getProducts;
