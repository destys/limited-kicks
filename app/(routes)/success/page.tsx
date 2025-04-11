import { CartCleaner } from '@/components/cart-cleaner/cart-cleaner';
import Button from '@/components/ui/button/button';
import { fetchWooCommerce } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface SuccessPageProps {
  searchParams: {
    orderId?: string;
  };
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const orderId = searchParams.orderId;

  if (orderId) {
    try {
      await fetchWooCommerce(`orders/${orderId}`, {}, "PUT", {
        status: "processing",
      });
    } catch (err) {
      console.error("Ошибка при обновлении статуса заказа:", err);
    }
  }

  return (
    <div className="flex justify-center items-center px-4 mt-32 mb-40">
      <CartCleaner />
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="mb-4">Ваш заказ принят!</h1>
        <p className="mb-10">Наши менеджеры свяжутся с вами в ближайшее время</p>
        <Link href="/"><Button styled="filled" className="w-full">На главную</Button></Link>
      </div>
    </div>
  );
};

export default SuccessPage;