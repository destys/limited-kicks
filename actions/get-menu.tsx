import { IMenu } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp-api-menus/v2/menus`;

const getMenu = async (id: number): Promise<IMenu> => {
    const res = await fetch(`${URL}/${id}`, {
        next: { revalidate: 10 }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch menu: ${res.statusText}`);
    }

    const data = await res.json(); 

    return data;  
};

export default getMenu;