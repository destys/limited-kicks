import { Brand } from "@/types";
import BrandsItem from "./brands-item";

const BrandsCatalog = () => {
    const brands = [
        {
            id: 0,
            title: "Nike",
            image: "nike.png",
        },
        {
            id: 1,
            title: "Adidas",
            image: "adidas.png",
        },
        {
            id: 2,
            title: "YZY",
            image: "yzy.png",
        },
        {
            id: 3,
            title: "Jordan",
            image: "jordan.png",
        },
        {
            id: 4,
            title: "New Balance",
            image: "nb.png",
        },
    ];

    return (
        <div className="flex lg:flex-wrap gap-3 mb-2 lg:mb-10 pb-3 lg:pb-0 overflow-x-scroll lg:overflow-visible ">
            {brands.map((item) => (
                <BrandsItem key={item.id} data={item} />
            ))}
        </div>
    );
}

export default BrandsCatalog;
