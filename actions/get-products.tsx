import { Products } from "@/types";
import { buildUrlWithParams, QueryParams } from "@/utils/build-url";


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
        const endpoint = `${process.env.WP_ADMIN_REST_URL}/custom-woocommerce/v1/products?${queryString}`;

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
