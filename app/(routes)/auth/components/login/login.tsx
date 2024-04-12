import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PacmanLoader } from "react-spinners";

import useUser from "@/hooks/use-user";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const router = useRouter();
  const user = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    const email = formData.get('login');
    const password = formData.get('password');

    axios.post(`${process.env.WP_ADMIN_REST_URL}/jwt-auth/v1/token`, {
      "username": email,
      "password": password
    }).then((response) => {
      user.login(response.data.token);
      router.push('/profile');
    }).catch((error) => {
      console.error(error)
      setError(error.response.data.message)
    }).finally(() => {
      setLoading(false);
    })
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base  text-center ">
        Введите ваш email и пароль. Если аккаунта еще нет, он будет создан.
      </p>
      <Input
        type="text"
        className="mb-2.5 md:mb-5"
        placeholder="example@mail.com"
        name="login"
      />
      <Input
        type="password"
        className="mb-2.5 md:mb-5"
        placeholder="********"
        name="password"
      />
      {error && (
        <div dangerouslySetInnerHTML={{ __html: error }} className="mt-[-15px] mb-2.5 md:mb-5 text-red-500 text-sm" />
      )}

      <Button styled="filled" className={"w-full flex justify-center items-center h-14"} type="submit">
        {loading ? <PacmanLoader color="#fff" size={18} /> : "Отправить код"}
      </Button>
    </form>
  );
}
