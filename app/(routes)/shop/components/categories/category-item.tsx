import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryItemProps {
    data: Category;
}


const CategoryItem: React.FC<CategoryItemProps> = ({ data }) => {
    const pathname = usePathname();
    const isActive = data.slug === pathname.split("/").pop();

    return (
        <Link
            href={data.id === 0 ? `/${data.slug}` : `/category/${data.slug}`}
            className={`flex justify-center items-center relative h-[97px] lg:p-10 md:h-[200px] bg-add_1 rounded-[20px] border border-transparent ${isActive &&
                "!border-black after:w-[90%] after:h-[2px] after:bg-black after:absolute after:bottom-[-14px] after:left-[50%] after:translate-x-[-50%]"
                }`}
        >
            {data.image ? (<Image
                src={data.image.src}
                alt={data.name}
                width={100}
                height={100}
                className=" max-md:max-w-[50px] max-md:max-h-[50px]"
            />) : (
                data.name
            )}

        </Link>
    );
}

export default CategoryItem