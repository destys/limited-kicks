import { User } from "@/types";
import Button from "@/components/ui/button/button"
import Input from "@/components/ui/input/input"
import toast from "react-hot-toast";
import axios from "axios";
import useUser from "@/hooks/use-user";
import { FormEvent } from "react";

interface IChangeUserPassword {
    user: User;
}

const ChangeUserPassword: React.FC<IChangeUserPassword> = ({ user }) => {
    const { jwtToken } = useUser();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get('current-password');
        const newPassword = formData.get('new-password');
        const confirmPassword = formData.get('confirm-password'); 

        // Проверка совпадения нового пароля и его подтверждения
        if (newPassword !== confirmPassword) {
            console.error('New password and confirm password do not match');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.WP_ADMIN_REST_URL}/wp/v2/users/${user.id}`,
                { password: newPassword },
                {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            toast.success('Пароль успешно изменен');
        } catch (error) {
            console.error('Error updating user password:', error);
            throw error;
        }
    }

    return (
        <form action="#" className="grid gap-3 mb:gap-5 lg:gap-7" onSubmit={handleSubmit}>
            <Input
                name="current-password"
                type={"password"}
                label={"Старый пароль"}
                placeholder={"Введите старый пароль"}
                autoComplete="current-password"
                required
            />
            <Input
                name="new-password"
                type={"password"}
                label={"Новый пароль"}
                placeholder={"Введите новый пароль"}
                autoComplete="new-password"
                required
            />
            <Input
                name={"confirm-password"}
                type={"password"}
                label={"Подтвердите новый пароль"}
                placeholder={"Подтвердите новый пароль"}
                autoComplete="new-password"
                required
            />

            <Button styled="filled" type="submit" className={"w-fit px-10"}>
                Изменить пароль
            </Button>
        </form>
    )
}

export default ChangeUserPassword