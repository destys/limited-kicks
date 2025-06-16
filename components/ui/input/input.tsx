"use client";

import { forwardRef } from "react";
import InputMask from "react-input-mask";
import { twMerge } from "tailwind-merge";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, name, placeholder, mask, ...props }, ref) => {
    const classes =
      "py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base";

    return (
      <div>
        {label && (
          <label className="block mb-1.5 md:mb-3 text-xs xs:text-sm sm:text-base lg:text-lg">
            {label}
          </label>
        )}

        {type === "tel" ? (
          <InputMask
            {...props}
            mask={mask || "+7 999 999-99-99"}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                ref={ref}
                className={twMerge(classes, className)}
                name={name}
                placeholder={placeholder}
                type="tel"
              />
            )}
          </InputMask>
        ) : (
          <input
            {...props}
            ref={ref}
            type={type}
            className={twMerge(classes, className)}
            name={name}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;