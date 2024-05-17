"use client";
import { SetStateAction, useState } from "react";
import Confirmation from "./components/confirmation/confirmation";
import Login from "./components/login/login";

export default function Cabinet() {
  const [isSent, setIsSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleFormSubmit = (e: SetStateAction<string>) => {
    setUserEmail(e);
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
              userEmail={userEmail}
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
