import { Page } from "@/types";


const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/pages`;

const getPage = async (slug: string): Promise<Page[]> => {
    const res = await fetch(`${URL}?slug=${slug}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getPage;