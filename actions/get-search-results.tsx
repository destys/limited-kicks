import { fetchWooCommerce } from "@/lib/utils";
import { Product, Products } from "@/types";

interface IQuery {
    search: string;
    per_page: number;
}

const getSearchResults = async (query: IQuery): Promise<Products[]> => {
    const res = await fetchWooCommerce('products', query);

    return res.filter((product: Product) =>
        product.name.toLowerCase().includes(query.search.toLowerCase())
    );
};

export default getSearchResults;
