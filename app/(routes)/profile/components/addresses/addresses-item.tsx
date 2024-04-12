"use client";

import Image from "next/image";

export default function AddressItem({ data, onDeleteItem }) {
  const handleDeleteItem = (id: number) => {
    onDeleteItem(id);
  };
  return (
    <div className="">
      <div className="flex flex-col xs:flex-row xs:justify-between items-center gap-5">
        <div className="flex items-center justify-between py-5 px-4 md:py-7 md:px-8 lg:py-9 lg:px-10 bg-add_1 w-full rounded-lg">
          <div className="text-sm md:text-base">
            {data.city}, ул.{data.street}, {data.build}
          </div>
          <Image
            src={"/icons/Icon/Alt_Arrow_Right.svg"}
            width={28}
            height={28}
            alt="arrow"
          />
        </div>
        <button onClick={(id) => handleDeleteItem(data.id)} className="flex items-center gap-2">
          <span className="xs:hidden text-xs">Удалить</span>
          <Image
            src={"/icons/Icon/Trash.svg"}
            width={28}
            height={28}
            alt="delete"
          />
        </button>
      </div>
      <div>{/* Форма изменения адреса */}</div>
    </div>
  );
}
