import { User } from "@/types";
import axios from "axios";

const URL = `${process.env.WP_ADMIN_REST_URL}/wp/v2/users/me`;

const getUser = async (token: string): Promise<User> => {
    try {
        // Выполняем первый запрос и ожидаем его завершения
        const response = await axios.get(`${URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        // Получаем id пользователя из первого запроса
        const userId = response.data.id;

        // Выполняем второй запрос и ожидаем его завершения
        const userResponse = await axios.get(`${process.env.WP_ADMIN_REST_URL}/wp/v2/users/${userId}?context=edit`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        // Возвращаем данные пользователя из второго запроса
        return userResponse.data;
    } catch (error) {
        throw error; // Пробрасываем ошибку дальше, чтобы ее можно было обработать
    }
};

export default getUser;