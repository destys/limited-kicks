"use client";

import React, { useState } from "react";
import FilterItem from "./filter-item";
import FiltersDesktop from "./filters-desktop";
import FiltersMobile from "./filters-mobile";

const TopBar = ({ count }: { count: number }) => {

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
    <>
      <FiltersMobile count={count} filters={filters} />
      <FiltersDesktop count={count} filters={filters} />
    </>
  );
}

export default TopBar;