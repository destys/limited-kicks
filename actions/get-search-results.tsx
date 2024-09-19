import { fetchWooCommerce } from "@/lib/utils";
import { Product, Products } from "@/types";

// Запрос к кастомному эндпоинту для поиска по заголовку и SKU
const fetchCustomSearchResults = async (search: string, per_page: number): Promise<Products[]> => {
    const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom-api/v1/search-products?search=${search}&per_page=${per_page}`);
    if (!response.ok) {
        throw new Error('Ошибка поиска товаров');
    }
    const data = await response.json();
    return data;
};

interface IQuery {
    search: string;
    per_page: number;
}

const getSearchResults = async (query: IQuery): Promise<Products[]> => {
    // Выполняем запрос к кастомному API, который ищет как по заголовку, так и по SKU
    const resByCustomApi = await fetchCustomSearchResults(query.search, query.per_page);

    return resByCustomApi;
};

export default getSearchResults;