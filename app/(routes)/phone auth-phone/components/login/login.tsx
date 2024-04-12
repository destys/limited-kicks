import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";

interface LoginProps {
  onFormSubmit: (e: SetStateAction<string>) => void;
}

interface FormData {
  phone: string;
}

export default function Login({ onFormSubmit }: LoginProps) {
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Вызов колбэк-функции из родительского компонента
    if (
      !formData.phone.includes("_") &&
      formData.phone.length > 0
    ) {
      onFormSubmit(formData.phone);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base  text-center ">
        Введите номер телефона, мы отправим Вам СМС с кодом подтверждения
      </p>
      <Input
        type="tel"
        className={`mb-2.5 md:mb-5 ${showError && "border-red-500"}`}
        placeholder="+7 999 999-99-99"
        name="phone"
        onChange={handleChange}
      />
      {showError && (
        <div className={"mt-[-15px] mb-2.5 md:mb-5 text-red-500 text-sm"}>
          Введите корректный номер телефона
        </div>
      )}

      <Button styled="filled" className={"w-full"} type="submit">
        Отправить код
      </Button>
    </form>
  );
}
