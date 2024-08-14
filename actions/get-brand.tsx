import { Brand } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/brand`;

const getBrand = async (slug?: string): Promise<Brand[]> => {
    const res = await fetch(`${URL}?slug=${slug}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getBrand;