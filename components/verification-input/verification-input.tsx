import React, { useState } from "react";

export default function VerificationCodeInput({ onCodeChange, onDataEntered }) {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    onCodeChange(newCode.join(""));
  };

  const handleKeyPress = (e, index) => {
    if (/^\d$/.test(e.key)) {
      // Если введена цифра, обновляем значение в текущем инпуте
      handleChange(index, e.key);

      // Переходим к следующему инпуту, если не последний
      if (index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      } else if (index === code.length - 1) {
        // Если текущий инпут последний, проверяем, все ли поля заполнены
        const isCodeFilled = code.every((value) => /^\d$/.test(value));

        // Если все поля заполнены, отправляем форму
        if (isCodeFilled) {
          onDataEntered();
          // Здесь вызывайте вашу функцию для отправки формы
          console.log("Форма отправлена:", code);
        }
      }
    } else if (e.key === "Backspace" && index > 0) {
      // Если нажат Backspace и не первый инпут, переходим к предыдущему инпуту
      document.getElementById(`code-input-${index - 1}`).focus();
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
            maxLength="1"
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            className="py-2 px-2.5 md:py-3 lg:py-4 lg:px-5 w-full bg-white rounded-[10px] mb-5 border border-add_4 text-center"
            placeholder="*"
          />
        </div>
      ))}
    </div>
  );
}
