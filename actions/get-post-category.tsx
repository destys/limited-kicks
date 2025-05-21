import { CategoryPostProps } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/categories`;

const getPostCategory = async (id: number): Promise<CategoryPostProps> => {
    const res = await fetch(`${URL}/${id}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getPostCategory;