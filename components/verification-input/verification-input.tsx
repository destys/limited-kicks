import React, { useState } from "react";

interface IVerificationCodeInput {
  onCodeChange: (code: string) => void;
  onDataEntered: () => void;
  message: string;
}

const VerificationCodeInput: React.FC<IVerificationCodeInput> = ({ onCodeChange, onDataEntered, message }) => {
  const [code, setCode] = useState<Array<string>>(["", "", "", ""]);

  const handleChange = (index: number, value: string): void => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    onCodeChange(newCode.join(""));

    // Проверяем, если все поля заполнены
    const isCodeFilled = newCode.every((val) => /^\d$/.test(val));
    if (isCodeFilled) {
      onDataEntered();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (/^\d$/.test(e.key)) {
      // Если введена цифра, обновляем значение в текущем инпуте
      handleChange(index, e.key);

      // Переходим к следующему инпуту, если не последний
      if (index < code.length - 1) {
        const nextInput = document.getElementById(`code-input-${index + 1}`) as HTMLInputElement | null;
        if (nextInput) nextInput.focus();
      }
    } else if (e.key === "Backspace" && index > 0) {
      // Если нажат Backspace и не первый инпут, переходим к предыдущему инпуту
      const prevInput = document.getElementById(`code-input-${index - 1}`) as HTMLInputElement | null;
      if (prevInput) prevInput.focus();
    }
    // Отменяем действие по умолчанию, чтобы избежать ввода других символов
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {code.map((value, index) => (
        <div key={index}>
          <input
            id={`code-input-${index}`}
            type="text"
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            className={`py-2 px-2.5 md:py-3 lg:py-4 lg:px-5 w-full bg-white rounded-[10px] mb-5 border border-add_4 text-center ${message && "border-red-500"}`}
            placeholder="*"
          />
        </div>
      ))}
    </div>
  );
}

export default VerificationCodeInput;
