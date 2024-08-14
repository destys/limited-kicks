import { CommonBanner } from "@/types";
import Image from "next/image";

interface IBanner {
  data: {
    banner_dlya_pk: CommonBanner;
    banner_dlya_telefonov: CommonBanner;
  };
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
          <>
            <Image
              src={data.banner_dlya_pk.url}
              width={data.banner_dlya_pk.width}
              height={data.banner_dlya_pk.height}
              alt={data.banner_dlya_pk.alt || data.banner_dlya_pk.title}
              className="rounded-[20px] hidden md:block w-full"
            />
            <Image
              src={data.banner_dlya_telefonov.url}
              width={data.banner_dlya_telefonov.width}
              height={data.banner_dlya_telefonov.height}
              alt={data.banner_dlya_telefonov.alt || data.banner_dlya_telefonov.title}
              className="rounded-[20px] md:hidden h-[440px] object-contain"
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Banner
