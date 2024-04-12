'use client'
import { useEffect, useRef, useState } from "react";

import Price from "@/components/price/price";

interface IDiscount {
  totalAmount: number;
}

const Discount: React.FC<IDiscount> = ({ totalAmount }) => {
  const totalRef = useRef<HTMLDivElement | null>(null);
  const bgAdd2Ref = useRef<HTMLDivElement | null>(null);
  const [amount, setAmount] = useState(totalAmount); // Здесь ваша переменная amount

  useEffect(() => {
    if (totalRef.current && bgAdd2Ref.current) {
      const total = parseInt(totalRef.current.getAttribute("data-total") || "0", 10);
      const percentage = Math.round((amount / total) * 100);

      bgAdd2Ref.current.style.width = `${percentage}%`;
    }
  }, [amount]);

  return (
    <div>
      <h1 className="hidden lg:block mb-3 lg:mb-8 uppercase">
        Дисконтная программа
      </h1>
      <div>
        <div className="flex flex-wrap items-center gap-8 md:gap-16 lg:gap-20 2xl:gap-28 mb-6 md:mb-8 lg:mb-12 text-[10px] xs:text-xs sm:text-sm md:text-base">
          <div className=" whitespace-nowrap">
            <p className="mb-3">Ваша скидка</p>
            <p className="font-medium text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
              0%
            </p>
          </div>
          <div className=" whitespace-nowrap">
            <p className="mb-3">Номер карты</p>
            <p className="font-medium text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
              1234 5678 9123 4567
            </p>
          </div>
          <div className=" whitespace-nowrap">
            <p className="mb-3">Сумма покупок</p>
            <div className="font-medium text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
              <Price value={amount} />
            </div>
          </div>
        </div>
        <div>
          <div className="relative h-3 md:h-5 mb-2 sm:mb-4">
            <div
              className="absolute top-0 left-0 z-10 h-full w-full bg-add_1"
              ref={totalRef}
              data-total={100000}
            ></div>
            <div
              ref={bgAdd2Ref}
              className="absolute top-0 left-0 z-20 h-full bg-add_2"
            ></div>
          </div>
          <div className="flex justify-between items-center text-xs xs:text-sm sm:text-base">
            <p>0%</p>
            <p>5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount;