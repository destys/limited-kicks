import { Product } from "@/types"; import { stringify } from "querystring";

const getProductsByBrand = async (query: {}): Promise<Product[]> => {
    const URL = `${process.env.WP_ADMIN_REST_URL}/myplugin/v1/products_by_brand/${query ? "?" + stringify(query) : ""}`;

    const res = await fetch(URL, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getProductsByBrand;