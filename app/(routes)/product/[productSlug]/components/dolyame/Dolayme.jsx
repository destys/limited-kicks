import Image from "next/image";
const Dolayme = ({ price }) => {
  console.log("price: ", price);
  if (price === 0 || price > 60000) return null;
  return (
    <div className="flex items-center gap-5 mb-5 md:mb-7 lg:mb-10 px-3 py-5 md:p-5 w-full bg-add_1 rounded-md lg:w-fit">
      <Image src="/images/dolyame.jpg" alt="dolyame" width="84" height="24" />
      <p className="font-medium text-sm md:text-base lg:text-lg">
        4 платежа по {Math.round(price / 4)} руб
      </p>
    </div>
  );
};

export default Dolayme;