import { CommonBanner } from "@/types";
import Image from "next/image";

interface IBanner {
  data: CommonBanner;
}

const Banner: React.FC<IBanner> = ({ data }) => {
  return (
    <section>
      <div>
        {!data ? (
          <div className="flex justify-center items-center rounded-[20px] w-full h-full bg-add_1">
            <h2 className="text-4xl md:text-5xl lg:text-7xl">Баннер</h2>
          </div>
        ) : (
          <Image
            src={data.url}
            width={data.width}
            height={data.height}
            alt={data.alt || data.title}
            className="rounded-[20px]"
          />
        )}
      </div>
    </section>
  );
}

export default Banner
