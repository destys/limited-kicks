interface PriceProps {
  before?: string;
  value: any;
  oldValue?: any;
  after?: string;
  className?: string;
}

const Price: React.FC<PriceProps> = ({ before, value, oldValue, after, className }) => {



  const price = parseFloat(value).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });

  const oldPrice = parseFloat(oldValue).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });

  return (
    <div className={className}>
      {oldValue ? (
        <>{before} <span className="inline mr-2 line-through text-sm">{oldPrice}</span>{price} {after}</>
      ) : (
        <>{before} {price} {after}</>
      )}

    </div>
  );
}

export default Price
