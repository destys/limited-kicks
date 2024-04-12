"use client";

import Login from "./components/login/login";

export default function Cabinet() {


  return (
    <section>
      <div className="container !max-w-[530px] mx-auto">
        <div>
          <h1 className="mb-6 text-center uppercase">Вход или регистрация</h1>
          <Login />
        </div>
      </div>
    </section>
  );
}
