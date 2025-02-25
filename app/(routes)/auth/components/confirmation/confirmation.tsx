import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button/button";
import useUser from "@/hooks/use-user";
import Loader from "@/components/ui/loader/loader";

interface ConfirmationProps {
  userPhone: string;
  onChangeUserPhone: () => void;
}

export default function Confirmation({ userPhone, onChangeUserPhone }: ConfirmationProps) {
  const [code, setCode] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleSetCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value.replace(/\D/g, '').substring(0, 4);

    setCode(newCode);

    if (newCode.length === 4) {
      confirmationSubmit(newCode);
    }
  };

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

  const confirmationSubmit = async (code: any) => {
    setLoading(true);
    setMessage("")
    const phone = userPhone;
    try {
      const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/verify-sms-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.data.data.token);

      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error: any) {
      console.error('error: ', error);
      setMessage(`Error: ${error.message}`);
      return null;
    } finally {
      setLoading(false)
    }

  };

  return (
    <div>
      <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base text-center">
        Мы отправили Вам четырехзначный код на номер телефона {" "}
        <strong>{userPhone}</strong>
      </p>
      <div className="relative mb-4">
        {loading && <Loader size={18} />}
        <input
          onChange={handleSetCode}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          placeholder="0000"
          type="text"
          name="code"
          maxLength={4}
          value={code}
          className="border-b rounded-none tracking-[30px] py-3 px-4 md:py-4 md:px-6 w-full bg-white text-center text-xs xs:text-sm lg:text-base"
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
    </div>
  );
}
