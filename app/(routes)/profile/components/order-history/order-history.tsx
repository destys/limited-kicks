import React from "react";
import OrderItem from "./order-item";
import Price from "@/components/price/price";

export default function OrderHistory() {
  const orders = [
    {
      id: 0,
      title: "YEEZY BOOST 350 V2 SULFUR",
      image: "prod1.png",
      status: "Оплачено",
    },
    {
      id: 1,
      title: "NEW BALANCE 991 X PALACE TEAL",
      image: "prod2.png",
      status: "Доставлено",
    },
  ];
  return (
    <div>
      <h1 className="hidden lg:block mb-8 uppercase">Мои заказы</h1>
      <div className="grid gap-4 md:gap-6 lg:gap-8">
        {orders.map((item) => (
          <OrderItem key={item.id} data={item} />
        ))}
      </div>
      <div className="flex items-center justify-between gap-5 mt-8 pt-5 border-t font-medium text-base md:textlg lg:text-xl">
        <div>Итого</div>
        <Price value={35168} />
      </div>
    </div>
  );
}
