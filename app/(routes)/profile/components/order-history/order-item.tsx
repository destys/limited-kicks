import Price from "@/components/price/price";
import { IOrder } from "@/types";
import Image from "next/image";
import React from "react";

interface IOrderItem {
  data: IOrder;
}

const OrderItem: React.FC<IOrderItem> = ({ data }) => {
  const statusColor = getStatusColor(data.status);

  const pub_date = new Date(data.date_created).toLocaleDateString();

  return (

    <div className="py-5 px-7 bg-add_1 rounded-xl">
      {/* Товары */}
      {data.line_items.map(item => (
        <div key={item.id} className="flex items-center gap-3 sm:gap-7 md:gap-8 lg:gap-10 2xl:gap-14 mb-4 bg-add_1 rounded-xl">
          <div className="shrink-0 basis-[121px] md:basis-[162px] 2xl:basis-[238px] bg-white rounded-xl">
            <Image
              src={item.image.src || `/images/products/1-435.jpeg`}
              width={238}
              height={143}
              alt={data.name}
              className="rounded-2xl max-h-[143px] object-contain"
            />
          </div>
          <div>
            <div className="mb-3 md:mb-6 font-medium text-sm sm:text-base lg:text-xl uppercase">
              {item.name}
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center xs:flex-wrap gap-3 sm:flex-nowrap xs:gap-8 lg:gap-16 xl:gap-20 2xl:gap-28 mb-4 md:mb-6 lg:mb-8 text-[10px] xs:text-xs sm:text-sm md:text-base">
              <div className="w-1/3">
                {item.variation_id !== 0 && (
                  <>
                    <p className="mb-3">Размер</p>
                    <p className="font-medium text-sm sm:text-base lg:text-xl whitespace-nowrap">
                      {item.meta_data[0].display_value} EUR
                    </p>
                  </>
                )}
              </div>
              <div className="w-1/3">
                <p className="mb-3">Количество</p>
                <p className="font-medium text-sm sm:text-base lg:text-xl whitespace-nowrap">
                  {item.quantity} шт
                </p>
              </div>
              <div className="w-1/3">
                <p className="mb-3">Сумма</p>
                <p className="font-medium text-sm sm:text-base lg:text-xl whitespace-nowrap">
                  <Price value={Number(item.total)} />
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Инфомрация о заказе */}
      <div className="grid grid-cols-2 xs:flex xs:flex-row xs:justify-center xs:items-center gap-3 xs:gap-6 md:gap-12 lg:gap-24 2xl:gap-28 text-[10px] pt-3 xs:text-xs sm:text-sm md:text-base border-t">
        <div>
          <p className="mb-3">Дата заказа</p>
          <p className="font-medium text-sm sm:text-base lg:text-xl">
            {pub_date}
          </p>
        </div>
        <div>
          <p className="mb-3">Статус</p>
          <p
            className={`font-medium text-sm sm:text-base lg:text-xl ${statusColor}`}
          >
            {data.status}
          </p>
        </div>
        <div>
          <p className="mb-3">Доставка</p>
          <p
            className="font-medium text-sm sm:text-base lg:text-xl"
          >
            <Price value={Number(data.shipping_lines[0]?.total) || 0} />
          </p>
        </div>
        <div>
          <p className="mb-3">Сумма заказа</p>
          <p
            className="font-medium text-sm sm:text-base lg:text-xl"
          >
            <Price value={Number(data.total)} />
          </p>
        </div>
      </div>
    </div >
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "processed":
      return "text-[#2ACF27]";
    case "Доставлено":
      return "text-main";
    default:
      return "";
  }
}


export default OrderItem;