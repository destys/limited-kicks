import { Post } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/posts`;

const getPost = async (slug: string): Promise<Post[]> => {
    const res = await fetch(`${URL}?slug=${slug}&_embed=true`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getPost;