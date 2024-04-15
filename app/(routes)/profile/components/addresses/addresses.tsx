"use client";

import { User } from "@/types";

import React, { useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/ui/button/button";

import addressesList from "./addresses.data";
import AddressItem from "./addresses-item";

interface IAddresses {
  user: User;
}

const Addresses: React.FC<IAddresses> = ({ user }) => {
  console.log('user: ', user);
  const [addresses, setAddresses] = useState(user.acf.addresses);

  const handleDeleteAddress = (id: number) => {
    toast.success("Адрес удален");
  };

  return (
    <div>
      <h1 className="mb-8 uppercase">Мои адреса</h1>
      <div className="grid gap-4">
        {user.acf.addresses.map(item => (
          <AddressItem
            data={item}
            key={item.id}
            onDeleteItem={handleDeleteAddress}
          />
        ))}
        <Button styled={"filled"} className={'w-full mt-3 xs:mt-0 xs:w-fit'}>Добавить адрес</Button>
      </div>
    </div>
  );
}

export default Addresses;