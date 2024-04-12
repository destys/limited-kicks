interface PriceProps {
  before?: string;
  value: any;
  after?: string;
  className?: string;
}

const Price: React.FC<PriceProps> = ({ before, value, after, className }) => {


  const price = parseFloat(value).toLocaleString("ru-RU", {
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
