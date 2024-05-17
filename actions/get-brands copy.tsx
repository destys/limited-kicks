import { Brand } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/brand`;

const getBrands = async (slug?: string): Promise<Brand[]> => {
    const res = await fetch(`${URL}${slug ? "?slug=" + slug : ""}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getBrands;