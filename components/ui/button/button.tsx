"use client";
import { MouseEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  styled: "filled" | "outlined";
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  styled,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const typeClasses = getTypeClasses(styled);

  return (
    <button
      className={twMerge(
        "py-3 px-4 md:py-4 md:px-6 rounded-[10px] border border-black transition-colors text-xs md:text-sm lg:text-base",
        typeClasses,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type || "button"}
      {...props}
    >
      {children}
    </button>
  );
}

function getTypeClasses(styled: string) {
  switch (styled) {
    case "filled":
      return "bg-black text-white hover:bg-white hover:text-black disabled:bg-add_1 disabled:text-add_4 disabled:border-add_1 disabled:hover:border-add_1 disabled:hover:text-add_4 disabled:hover:bg_add_1 ";
    case "outlined":
      return "text-black  hover:bg-add_1";
    default:
      return "bg-black text-white hover:bg-white hover:text-black";
  }
}

export default Button;