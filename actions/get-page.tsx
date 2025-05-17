import { Page } from "@/types";

const BASE_URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/pages`;

type PageParam = string | number;

const getPage = async (param: PageParam): Promise<Page[]> => {
    const isId = typeof param === "number" || /^\d+$/.test(param.toString());
    const url = isId ? `${BASE_URL}/${param}` : `${BASE_URL}?slug=${param}`;

    const res = await fetch(url, {
        next: { revalidate: 10 }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return isId ? [data] : data;
};

export default getPage;