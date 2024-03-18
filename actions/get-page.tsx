import { Page } from "@/types";


const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/pages`;

const getPage = async (id: string): Promise<Page> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
};

export default getPage;