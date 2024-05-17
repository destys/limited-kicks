import BrandsItem from "./brands-item";
import getBrands from "@/actions/get-brands"; 

const BrandsCatalog = async () => {
    const brands = await getBrands();

    return (
        <div className="flex lg:flex-wrap gap-3 mb-2 lg:mb-10 pb-3 lg:pb-0 overflow-x-scroll lg:overflow-visible ">
            {brands.map((item) => (
                <BrandsItem key={item.id} data={item} />
            ))}
        </div>
    );
}

export default BrandsCatalog;
