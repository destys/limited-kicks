"use client";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Confirmation from "./components/confirmation/confirmation";
import Login from "./components/login/login";
import useUser from "@/hooks/use-user";
import { User } from "@/types";
import getUser from "@/actions/get-user";

export default function Cabinet() {
  const router = useRouter()
  const [isSent, setIsSent] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { jwtToken, logout } = useUser();

  useEffect(() => {
    const FetchData = async () => {
      if (jwtToken) {
        router.push('/profile')
        try {
          setLoading(true);
          setError(false);
          const userData = await getUser(jwtToken);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          logout();
          router.push('/auth');
        } finally {
          setLoading(false);
        }
      }
    }
    FetchData();
  }, [jwtToken, logout, router]);

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
