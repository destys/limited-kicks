import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { PacmanLoader } from "react-spinners";

interface LoginProps {
  onFormSubmit: (e: SetStateAction<string>) => void;
}

export default function Login({ onFormSubmit }: LoginProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = e.currentTarget.phone.value;

    try {
      setMessage('')
      setLoading(true)
      const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/send-sms-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (response.ok) {
        onFormSubmit(phone);
        setMessage('SMS sent successfully.');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error: any) {
      console.error('error: ', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base  text-center ">
        Введите номер телефона, мы отправим Вам письмо с кодом подтверждения
      </p>
      <Input
        type="tel"
        className={`mb-2.5 md:mb-5 ${message && "border-red-500"}`}
        placeholder="+7 999 999-99-99"
        name="phone"
      />
      {message && (
        <div className={"mt-[-15px] mb-2.5 md:mb-5 text-red-500 text-sm"}>
          {message}
        </div>
      )}

      <Button styled="filled" className={"w-full flex justify-center items-center h-14"} type="submit" >
        {loading ? <PacmanLoader color="#fff" size={18} /> : "Вход"}
      </Button>
    </form>
  );
}
