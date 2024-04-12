"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/ui/button/button";

import addressesList from "./addresses.data";
import AddressItem from "./addresses-item";

export default function Addresses() {
  const [addresses, setAddresses] = useState(addressesList);

  const handleDeleteAddress = (id: number) => {
    const updatedAddressesList = addresses.filter(
      (address) => address.id !== id
    );
    setAddresses(updatedAddressesList);
    toast.success("Адрес удален");
  };

  return (
    <div>
      <h1 className="mb-8 uppercase">Мои адреса</h1>
      <div className="grid gap-4">
        {addresses.length ? (
          addresses.map((item) => (
            <AddressItem
              data={item}
              key={item.id}
              onDeleteItem={handleDeleteAddress}
            />
          ))
        ) : (
          <p>Нет сохраненных адресов</p>
        )}
        <Button styled={"filled"} className={'w-full mt-3 xs:mt-0 xs:w-fit'}>Добавить адрес</Button>
      </div>
    </div>
  );
}
