import { User } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

import Button from "@/components/ui/button/button"
import Input from "@/components/ui/input/input"
import useUser from "@/hooks/use-user";
import { FormEvent } from "react";

interface IChangeUserInfo {
    user: User;
}

const ChangeUserInfo: React.FC<IChangeUserInfo> = ({ user }) => {
    const { jwtToken } = useUser();
    const userId = user.id

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = {
            first_name: formData.get('first-name'),
            last_name: formData.get('last-name'),
            birthday: formData.get('birthdate'),
            email: formData.get('email'),
        };

        try {
            const response = await axios.post(`${process.env.WP_ADMIN_REST_URL}/wp/v2/users/${userId}`, userData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });
            toast.success('Данные успешно обновлены')
            return response.data;
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    };

    return (
        <form
            action="#"
            className="grid gap-4 mb:gap-5 lg:gap-7 mb-7 lg:mb-10"
            onSubmit={handleSubmit}
        >
            <Input type="text" name="first-name" label={"Имя"} placeholder={"Введите имя"} required={true} defaultValue={user.first_name} />
            <Input type="text" name="last-name" label={"Фамилия"} placeholder={"Введите фамилию"} required={true} defaultValue={user.last_name} />
            <Input
                name="birthdate"
                type="date"
                label={"Дата рождения"}
                placeholder="ДД.ММ.ГГГГ"
                required
                defaultValue={user.birthdate}
            />
            <Input
                name="email"
                type="email"
                label={"Email"}
                placeholder="Введите E-mail"
                required
                defaultValue={user.email}
            />
            <Button styled="filled" type="submit" className={"w-fit px-10"}>
                Обновить данные
            </Button>
        </form>
    )
}

export default ChangeUserInfo