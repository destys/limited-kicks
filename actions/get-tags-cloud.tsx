import { Tag } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/custom/v1/tags`;

const getTagsCloud = async (taxonomy?: string, id?: number): Promise<Tag[]> => {
    const res = await fetch(`${URL}?taxonomy=${taxonomy}&id=${id}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getTagsCloud;