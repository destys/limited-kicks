import { Page, Posts } from "@/types";


const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/posts`;

const getPosts = async (query: {}): Promise<Posts> => {
    const res = await fetch(`${URL}${query}`);

    return res.json();
};

export default getPosts;