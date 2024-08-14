import { Post } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/posts`;

const getPosts = async (query: {}): Promise<Post[]> => {
    const res = await fetch(`${URL}${query}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getPosts;