"use client";

import { useState } from "react";
import InputMask from "react-input-mask";

import { twMerge } from "tailwind-merge";

export default function Input({
  className,
  type,
  label,
  name,
  placeholder,
  ...props
}) {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);

  const classes =
    "py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base";

  return (
    <div>
      {label && (
        <label className="block mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg ">
          {label}
        </label>
      )}
      {type === "tel" ? (
        <InputMask
          {...props}
          mask="+7 999 999-99-99"
          onChange={onChange}
          value={value}
          className={twMerge(classes, className)}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className={twMerge(classes, className)}
          name={name}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
