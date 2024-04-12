import Price from "@/components/price/price";
import Image from "next/image";
import React from "react";

interface IOrderItem {
  data: {
    status: string;
    image: string;
    title: string;
  }
}

const OrderItem: React.FC<IOrderItem> = ({ data }) => {
  const statusColor = getStatusColor(data.status);
  return (
    <div className="flex items-center gap-3 sm:gap-7 md:gap-8 lg:gap-10 2xl:gap-14 py-5 px-7">
      <div className="shrink-0 basis-[121px] md:basis-[162px] 2xl:basis-[238px]">
        <Image
          src={`/images/products/${data.image}`}
          width={238}
          height={143}
          alt={data.title}
          className="rounded-2xl"
        />
      </div>
      <div>
        <div className="mb-3 md:mb-6 font-medium text-sm sm:text-base lg:text-xl uppercase">
          {data.title}
        </div>
        <div className="flex items-center flex-wrap gap-3 xs:gap-8 lg:gap-16 xl:gap-20 2xl:gap-28 mb-4 md:mb-6 lg:mb-8 text-[10px] xs:text-xs sm:text-sm md:text-base">
          <div>
            <p className="mb-3">Размер</p>
            <p className="font-medium text-sm sm:text-base lg:text-xl whitespace-nowrap">
              36 US
            </p>
          </div>
          <div>
            <p className="mb-3">Количество</p>
            <p className="font-medium text-sm sm:text-base lg:text-xl whitespace-nowrap">
              1 шт
            </p>
          </div>
          <div>
            <p className="mb-3">Сумма</p>
            <p className="font-medium text-sm sm:text-base lg:text-xl whitespace-nowrap">
              <Price value={35961} />
            </p>
          </div>
        </div>
        <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-6 md:gap-12 lg:gap-24 2xl:gap-28 text-[10px] xs:text-xs sm:text-sm md:text-base">
          <div>
            <p className="mb-3">Дата заказа</p>
            <p className="font-medium text-sm sm:text-base lg:text-xl">
              01.01.2000
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
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "Оплачено":
      return "text-[#2ACF27]";
    case "Доставлено":
      return "text-main";
    default:
      return "";
  }
}


export default OrderItem;