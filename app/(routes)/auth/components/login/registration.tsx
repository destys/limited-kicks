'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PacmanLoader } from "react-spinners";

import useUser from "@/hooks/use-user";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { wooApi } from "@/lib/wc-rest-api";


export default function Registration() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const router = useRouter();
  const user = useUser();

  if (user.jwtToken) {
    router.push('/profile');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const data = {
      email,
      password,
      first_name: formData.get('name'),
      nickname: email ? String(email).replace("@", "_") : '',
    }

    wooApi.post('customers', data)
      .then((response: any) => {
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
      })
      .catch((error: {}) => {
        console.log('error: ', error);
      }).finally(() => setLoading(false));
  };

  return (
    <div className="max-w-[580px]">
      <h1 className="mb-6 text-center uppercase">Регистрация</h1>
      <form action="#" onSubmit={handleSubmit} className="max-w-[580px]">
        <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base  text-center ">
          Введите ваше имя и email. Пароль будет отправлен на электронную почту.
        </p>
        <Input
          type="text"
          className="mb-2.5 md:mb-5"
          placeholder="Ваше имя"
          name="name"
        />
        <Input
          type="text"
          className="mb-2.5 md:mb-5"
          placeholder="Ваш email"
          name="email"
          required
        />
        <Input
          type="password"
          className="mb-2.5 md:mb-5"
          placeholder="Ваш пароль"
          name="password"
          required
        />
        {error && (
          <div dangerouslySetInnerHTML={{ __html: error }} className="mt-[-15px] mb-2.5 md:mb-5 text-red-500 text-sm" />
        )}

        <Button styled="filled" className={"w-full flex justify-center items-center h-14"} type="submit">
          {loading ? <PacmanLoader color="#fff" size={18} /> : "Регистраиця÷"}
        </Button>
      </form>
    </div>
  );
}
