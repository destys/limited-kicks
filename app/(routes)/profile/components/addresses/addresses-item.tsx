"use client";

import { Address } from "@/types";

import { useState } from "react";
import Image from "next/image";

import Loader from "@/components/ui/loader/loader";
interface IAddressesItem {
  data: Address;
  onDeleteItem: (address: {}) => void
}


const AddressItem: React.FC<IAddressesItem> = ({ data, onDeleteItem }) => {
  const [currentAddress, setCurrentAddress] = useState({
    'city': data.city,
    'street': data.street,
    'build': data.build,
    'apartment_number': data.apartment_number,
  })

  const handleDeleteItem = (address: {}) => {
    onDeleteItem(currentAddress);
  };

  return (
    <div className="relative">
      <div className="flex flex-col xs:flex-row xs:justify-between items-center gap-5">
        <div className="flex items-center justify-between py-5 px-4 md:py-7 md:px-8 lg:py-9 lg:px-10 bg-add_1 w-full rounded-lg">
          <div className="text-sm md:text-base">
            {data.city}, ул.{data.street}, д. {data.build} {!!data.apartment_number && `, кв. ${data.apartment_number}`}
          </div>
          <Image
            src={"/icons/Icon/Alt_Arrow_Right.svg"}
            width={28}
            height={28}
            alt="arrow"
          />
        </div>
        <button onClick={() => handleDeleteItem(currentAddress)} className="flex items-center gap-2">
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


export default AddressItem;