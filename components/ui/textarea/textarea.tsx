"use client";

import { ChangeEvent, useState } from "react";

import InputMask from 'react-input-mask';

import { twMerge } from "tailwind-merge";

interface TextareaProps {
  defaultValue?: any;
  className?: string;
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  autoComplete?: string;
  required?: boolean;
  rows?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Textarea: React.FC<TextareaProps> = ({
  className,
  label,
  name,
  rows,
  placeholder,
  value: propValue,
  onChange: propOnChange,
  ...props
}) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const classes =
    "py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base";

  return (
    <div>
      {label && (
        <label className="block mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg ">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={twMerge(classes, className)}
        name={name}
        placeholder={placeholder}
        rows={rows || 5}
      ></textarea>
    </div>
  );
}

export default Textarea;