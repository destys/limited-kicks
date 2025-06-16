import { CartCleaner } from '@/components/cart-cleaner/cart-cleaner';
import Button from '@/components/ui/button/button';
import { fetchWooCommerce } from '@/lib/utils';
import Image from 'next/image';
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
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 2xl:gap-20 items-center max-w-[1119px] mx-auto text-center">
        <div className="relative">
          <Image src={'/success.jpg'} width={559} height={559} alt='success' className='size-full aspect-square object-cover'/>
        </div>
        <div>
          <h2 className="mb-6 font-medium text-[26px]">Спасибо за вашу покупку!</h2>
          <p className="mb-10 text-xs text-add_4">Ваш заказ успешно оформлен, и оплата прошла успешно. Мы уже начали обрабатывать ваш заказ, и вскоре вы получите подтверждение по электронной почте. Если у вас есть вопросы, не стесняйтесь обращаться к нашей службе поддержки. Желаем вам приятной носки новых кроссовок!</p>
          <Link href="/shop" className='text-center block'><Button styled="filled" className="mx-auto">Продолжить покупки</Button></Link>
        </div>

      </div>
    </div>
  );
};

export default SuccessPage;