import React from "react";

interface IPrice {
  before?: string;
  value: number;
  after?: string;
  className?: string;
}

const Price: React.FC<IPrice> = ({ before, value, after, className }) => {
  const price = value.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });
  return (
    <div className={className}>
      {before} {price} {after}
    </div>
  );
}

export default Price
