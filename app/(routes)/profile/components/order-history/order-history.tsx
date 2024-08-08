import { wooApi } from "@/lib/wc-rest-api";
import React, { useEffect, useState } from "react";

import OrderItem from "./order-item";
import Loader from "@/components/ui/loader/loader";
import { IOrder } from "@/types";
import axios from "axios";

interface IOrderHistory {
  userId: number
}


const OrderHistory: React.FC<IOrderHistory> = ({ userId }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersByCustomerId = async (customerId: number) => {
      setLoading(true);
      const ordersList = await wooApi.get(`orders?customer=${customerId}`);
      //const ordersList = axios.get('https://admin.limited-kicks.ru/wp-json/wc/v3/orders?customer=11')
      //console.log('ordersList: ', ordersList);
      setOrders(ordersList.data)
      setLoading(false);
    };

    fetchOrdersByCustomerId(userId);
  }, [userId])

  return (
    <div className="relative min-h-full">
      {loading && <Loader />}
      <h1 className="hidden lg:block mb-8 uppercase">Мои заказы</h1>
      <div className="grid gap-4 md:gap-6 lg:gap-8">
        {orders.length ? orders.map((item) => (
          <OrderItem key={item.id} data={item} />
        )) : <h3>У вас еще нет заказов</h3>}
      </div>
    </div>
  );
}


export default OrderHistory