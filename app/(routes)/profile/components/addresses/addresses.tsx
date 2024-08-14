"use client";

import { User } from "@/types";
import { PacmanLoader } from "react-spinners";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import useUser from "@/hooks/use-user";
import Button from "@/components/ui/button/button";

import Input from "@/components/ui/input/input";
import AddressItem from "./addresses-item";

interface IAddresses {
  user: User;
}

const Addresses: React.FC<IAddresses> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { jwtToken } = useUser();
  const [addresses, setAddresses] = useState(user.acf.addresses || []);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDeleteAddress = async (address: any) => {
    const updatedAddresses = addresses.filter(
      (oldAddress) =>
        oldAddress.city !== address.city ||
        oldAddress.street !== address.street ||
        oldAddress.build !== address.build ||
        oldAddress.apartment_number !== address.apartment_number
    );
    const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/update-user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`, // Если требуется авторизация
      },
      body: JSON.stringify({
        acf: {
          addresses: updatedAddresses
        }
      }),
    });
    if (!response.ok) {
      throw new Error('Ошибка удаления адреса');
      toast.error('Ошибка уаления адреса')
    }
    if (response.ok) {
      toast.success('Адрес удален');
      setAddresses(updatedAddresses);
    }

    return response.json();
  };

  const updateAddresses = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newAddress = {
      'city': e.currentTarget.city.value,
      'street': e.currentTarget.street.value,
      'build': e.currentTarget.build.value,
      'apartment_number': e.currentTarget.apartment_number.value,
    };

    const form = e.currentTarget;


    const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/update-user/${user.id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`, // Если требуется авторизация
      },
      body: JSON.stringify({
        acf: {
          addresses: [...addresses, newAddress]
        }
      }),
    });

    form.reset();

    if (!response.ok) {
      throw new Error('Ошибка добавления адреса');
      toast.error('Ошибка добавления адреса');
    }
    if (response.ok) {
      toast.success('Адрес добавлен');
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
      setShowAddForm(false);
    }
    setLoading(false);

    return response.json();
  };

  return (
    <div>
      <h1 className="mb-8 uppercase">Мои адреса</h1>
      {!addresses.length ? (
        <p>Адреса еще не добавлены</p>
      ) : (
        <div className="grid gap-4">
          {addresses?.map(item => (
            <AddressItem
              data={item}
              key={item.city + item.street + item.build + item.apartment_number}
              onDeleteItem={handleDeleteAddress}
            />
          ))}
        </div>
      )}
      {showAddForm && <form className="mt-6" onSubmit={updateAddresses}>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 ">
          <Input type="text" name="city" placeholder="Город" />
          <Input type="text" name="street" placeholder="Улица" />
          <Input type="text" name="build" placeholder="Дом" />
          <Input type="text" name="apartment_number" placeholder="Квартира" />
        </div>
        <Button type="submit" styled="filled" className='mt-3 relative min-w-60 flex justify-center items-center h-14'>
          {loading ? <PacmanLoader color="#fff" size={14} /> : "Сохранить"}
        </Button>
      </form>}
      {!showAddForm && <Button type="button" styled={"filled"} className={'w-full mt-4 xs:w-fit'} onClick={() => setShowAddForm(true)}>Добавить адрес</Button>}

    </div>
  );
}

export default Addresses;