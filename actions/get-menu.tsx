import { IMenu } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp-api-menus/v2/menus`;

const getMenu = async (id: number): Promise<IMenu> => {
    const res = await fetch(`${URL}/${id}`, {
        next: { revalidate: 10 }
    });


    return res.json();
};

export default getMenu;