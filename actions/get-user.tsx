import { User } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/users/me/`;

const getUser = async (token: string): Promise<User> => {
    try {
        // Выполняем первый запрос и ожидаем его завершения
        const response = await fetch(URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
        }

        const data = await response.json();
        const userId = data.id; 

        const userResponse = await fetch(`${process.env.WP_ADMIN_REST_URL}/wp/v2/users/${userId}?context=edit`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!userResponse.ok) {
            throw new Error(`HTTP error, status = ${userResponse.status}`);
        }

        return await userResponse.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
};

export default getUser;
