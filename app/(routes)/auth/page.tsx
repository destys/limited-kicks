"use client";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

import useUser from "@/hooks/use-user";

import Confirmation from "./components/confirmation/confirmation";
import Login from "./components/login/login";

export default function Cabinet() {
  const router = useRouter()
  const [isSent, setIsSent] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  const { jwtToken } = useUser();

  if (jwtToken) {
    router.push('/profile')
  }

  const handleFormSubmit = (e: SetStateAction<string>) => {
    setUserPhone(e);
    setIsSent(true);
  };

  const handleChangeUserPhone = () => {
    setIsSent(false);
  };

  return (
    <section>
      <div className="container !max-w-[530px] mx-auto">
        <div>
          <h1 className="mb-6 text-center uppercase">Вход или регистрация</h1>
          {isSent ? (
            <Confirmation
              userPhone={userPhone}
              onChangeUserPhone={handleChangeUserPhone}
            />
          ) : (
            <Login onFormSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </section>
  );
}
