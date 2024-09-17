import getAttributes from "@/actions/get-attributes";
import BrandsItem from "./brands-item";
import { Attribute } from "@/types";

const BrandsCatalog = async ({ brandsArray }: { brandsArray: Attribute }) => {
   
    const attributesList = await getAttributes(brandsArray.id);
    const filteredAttributesList = attributesList.filter(attribute =>
        brandsArray.options.includes(attribute.id)
    );

    return (
        <div className="flex lg:flex-wrap gap-3 mb-2 lg:mb-10 pb-3 lg:pb-0 overflow-x-scroll lg:overflow-visible ">
            {filteredAttributesList.map((item) => (
                <BrandsItem key={item.id} data={item} />
            ))}
        </div>
    );
}

export default BrandsCatalog;
