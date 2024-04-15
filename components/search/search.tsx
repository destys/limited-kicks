"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import styles from "./search.module.scss";

export default function Search() {
  const router = useRouter();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?s=${e.currentTarget.search.value}`);
  };

  return (
    <form className={styles.search} onSubmit={onSearch}>
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
        >
          <path
            opacity="0.7"
            d="M13.9168 24.5C20.038 24.5 25.0002 19.5379 25.0002 13.4167C25.0002 7.29555 20.038 2.33337 13.9168 2.33337C7.79567 2.33337 2.8335 7.29555 2.8335 13.4167C2.8335 19.5379 7.79567 24.5 13.9168 24.5Z"
            stroke="#060F2F"
            strokeWidth="2"
          />
          <path
            d="M22.0835 21.5834L26.1668 25.6667"
            stroke="#060F2F"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <input type="search" name="search" placeholder="Поиск" />
    </form>
  );
}
