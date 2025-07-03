
import { Products } from "@/types";
import { QueryParams } from "@/utils/build-url";
import getProducts from "./get-products";

/**
 * Возвращает товары строго по списку ID,
 * сохраняя порядок, в котором эти ID переданы.
 *
 * @param query ожидает как минимум `{ include: '12,45,9' }`
 */
const getProductsListing = async (query: QueryParams = {}): Promise<Products[]> => {
    if (!query.include) return [];

    // 1️⃣ Нормализуем include: массив → строка
    const includeString = Array.isArray(query.include)
        ? query.include.join(",")
        : String(query.include);

    // 2️⃣ Дополняем параметрами, нужными Woo-API
    const params: QueryParams = {
        ...query,
        include: includeString,
        orderby: "include",               // сохранит порядок 12,45,9
        per_page: includeString.split(",").length, // чтобы не отсечь товары
    };

    // 3️⃣ Просто вызываем вашу универсальную функцию
    return await getProducts(params);
};

export default getProductsListing;