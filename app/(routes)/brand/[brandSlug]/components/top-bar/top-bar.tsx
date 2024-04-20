"use client";

import React, { useState } from "react";
import FilterItem from "./filter-item";

export default function TopBar({ count }: { count: number }) {
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    {
      id: 0,
      title: "Пол",
    },
    {
      id: 1,
      title: "Подкатегория",
    },
    {
      id: 2,
      title: "Размер",
    },
    {
      id: 3,
      title: "Бренд",
    },
    {
      id: 4,
      title: "Модель",
    },
    {
      id: 5,
      title: "Цена",
    },
    {
      id: 6,
      title: "Сортировка",
    },
  ];
  return (
    <div className="mb-6 pb-2 md:mb-11 md:pb-6 border-b">
      <div className="flex justify-between items-center gap-5">
        <div className="whitespace-nowrap text-[10px] xs:text-xs sm:text-sm md:text-base">
          <span className="font-light">Показано</span>{" "}
          <strong className="font-medium">{count}</strong>
        </div>
        <button
          className="flex items-center gap-1.5 md:gap-3 py-3 px-5"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" max-md:max-w-[20px] max-md:max-h-[20px]"
            >
              <path
                d="M23.8337 23.8333L5.16699 5.16666M23.8337 5.16666L5.16699 23.8333"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" max-md:max-w-[20px] max-md:max-h-[20px]"
            >
              <path
                d="M3.5 5.83331H8.16667M24.5 5.83331H12.8333M3.5 14H17.5M24.5 14H22.1667M3.5 22.1666H5.83333M24.5 22.1666H10.5"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5003 8.16667C11.789 8.16667 12.8337 7.122 12.8337 5.83333C12.8337 4.54467 11.789 3.5 10.5003 3.5C9.21166 3.5 8.16699 4.54467 8.16699 5.83333C8.16699 7.122 9.21166 8.16667 10.5003 8.16667Z"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.8333 16.3334C21.122 16.3334 22.1667 15.2887 22.1667 14C22.1667 12.7114 21.122 11.6667 19.8333 11.6667C18.5447 11.6667 17.5 12.7114 17.5 14C17.5 15.2887 18.5447 16.3334 19.8333 16.3334Z"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.16634 24.5C9.45501 24.5 10.4997 23.4553 10.4997 22.1666C10.4997 20.878 9.45501 19.8333 8.16634 19.8333C6.87768 19.8333 5.83301 20.878 5.83301 22.1666C5.83301 23.4553 6.87768 24.5 8.16634 24.5Z"
                stroke="#060F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          <span className="text-[10px] xs:text-xs sm:text-sm md:text-base">
            Фильтры
          </span>
        </button>
      </div>
      <div
        className={`grid-cols-2 gap-1.5 md:gap-3 flex-wrap mt-6 ${showFilters ? "grid md:flex" : "hidden"
          }`}
      >
        {filters.map((item) => (
          <FilterItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
