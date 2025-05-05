import { fetchWooCommerce } from "@/lib/utils";
import { Products } from "@/types";
import getProductsCount from "./get-products-count";

// Типизация для параметров
interface QueryParams {
    [key: string]: string | number | Array<string | number>;
}

const buildUrlWithParams = (params: QueryParams): string => {
    const urlSearchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => {
                // Только для attribute и attribute_term добавляем []
                if (key === 'attribute' || key === 'attribute_term') {
                    urlSearchParams.append(`${key}[]`, String(v));
                } else {
                    urlSearchParams.append(key, String(v)); // Без []
                }
            });
        } else if (value !== undefined && value !== null) {
            urlSearchParams.set(key, String(value));
        }
    });

    return urlSearchParams.toString();
};


const getProducts = async (query: QueryParams = {}): Promise<Products[]> => {
    const prepareQueryParams = (params: QueryParams): QueryParams => {
        const newParams = { ...params };

        if (Array.isArray(newParams.orderby)) {
            newParams.orderby = newParams.orderby.filter((v) => v !== 'date');
        }

        if (Array.isArray(newParams.order)) {
            newParams.order = newParams.order.filter((v) => v !== 'desc');
        }

        return newParams;
    };



    try {
        const cleanedParams = prepareQueryParams(query);
        const queryString = buildUrlWithParams(cleanedParams);

        //const queryString = buildUrlWithParams(query);
        const endpoint = `https://limited-kicks.ru/admin/wp-json/custom-woocommerce/v1/products?${queryString}`;

        const response = await fetch(endpoint);

        if (!response.ok) {
            console.error('Ошибка ответа от сервера:', response.statusText);
            return [];
        }

        const json = await response.json();

        // Примерно ожидаем такую структуру от твоего кастомного API
        return json.products ?? [];
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        return [];
    }
};

export default getProducts;
