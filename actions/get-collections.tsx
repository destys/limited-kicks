import { Brand } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/collection/?per_page=100`;

const getCollections = async (): Promise<Brand[]> => {
    const res = await fetch(`${URL}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getCollections;