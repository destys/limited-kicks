import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button/button";
import VerificationCodeInput from "@/components/verification-input/verification-input";

interface ConfirmationProps {
  userPhone: string;
  onChangeUserPhone: () => void;
}

export default function Confirmation({ userPhone, onChangeUserPhone }: ConfirmationProps) {
  const [code, setCode] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
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

  const confirmationSubmit = () => {
    router.push("/cabinet");
  };

  return (
    <form action="#" onSubmit={confirmationSubmit}>
      <p className="mb-4 sm:mb-6 lg:mb-10 text-xs xs:text-sm md:text-base text-center">
        Мы отправили Вам четырехзначный код на номер телефона который вы указали{" "}
        <br />
        {userPhone}
      </p>
      <VerificationCodeInput
        onCodeChange={handleCodeChange}
        onDataEntered={confirmationSubmit}
      />
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
