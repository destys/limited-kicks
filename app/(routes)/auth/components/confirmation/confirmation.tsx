import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button/button";
import VerificationCodeInput from "@/components/verification-input/verification-input";
import useUser from "@/hooks/use-user";
import Loader from "@/components/ui/loader/loader";

interface ConfirmationProps {
  userEmail: string;
  onChangeUserPhone: () => void;
}

export default function Confirmation({ userEmail, onChangeUserPhone }: ConfirmationProps) {
  const [code, setCode] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const buttonReset = () => {
    setIsButtonActive(false);
    setSecondsRemaining(60);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    // Запускаем таймер
    const timer = setTimeout(() => {
      setIsButtonActive(true);
    }, 60000);

    // Уменьшаем количество секунд каждую секунду
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Очищаем таймер и интервал при размонтировании компонента
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isButtonActive]);

  const confirmationSubmit = async () => {
    const email = userEmail;
    try {
      setLoading(true);
      const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/verify-email-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.data.data.token)
        router.push("/profile");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error: any) {
      console.error('error: ', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false)
    }

  };

  return (
    <form action="#" onSubmit={confirmationSubmit}>
      <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base text-center">
        Мы отправили Вам четырехзначный код на электронный адрес {" "}
        <strong>{userEmail}</strong>
      </p>
      <div className="relative">
        {loading && <Loader />}
        <VerificationCodeInput
          onCodeChange={handleCodeChange}
          onDataEntered={confirmationSubmit}
          message={message}
        />
      </div>

      {message && (
        <div className={"mt-[-15px] mb-2.5 md:mb-5 text-red-500 text-sm"}>
          {message}
        </div>
      )}

      <Button
        type="button"
        styled={"outlined"}
        onClick={onChangeUserPhone}
        className="mb-2.5 md:mb-5 w-full"
      >
        Изменить номер телефона
      </Button>

      <Button
        type="button"
        onClick={buttonReset}
        styled={"filled"}
        className={`w-full  ${isButtonActive
          ? ""
          : "!bg-transparent !border-transparent cursor-not-allowed"
          }`}
        disabled={!isButtonActive}
      >
        {isButtonActive
          ? `Отправить код еще раз`
          : `Отправить код еще раз (${secondsRemaining})`}
      </Button>
    </form>
  );
}
