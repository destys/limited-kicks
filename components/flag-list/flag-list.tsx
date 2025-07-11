import { Product } from "@/types";
import FlagItem from "../flag-item/flag-item";

interface IFlagList {
    data: Product;
    className?: string;
}

const FlagList: React.FC<IFlagList> = ({ data, className = "" }) => {
    const flagKeys = Object.keys(data.acf).filter(key => key.startsWith("flag_")) as Array<keyof typeof data.acf>;
    const flagValues = flagKeys.map(key => data.acf[key]).filter(Boolean); // убираем пустые

    return (
        <div className={`flex gap-2 ${className}`}>
            {flagValues.map((flag, index) => (
                <div
                    key={flag + index}
                    className={`
                        ${index > 1 ? "block max-lg:hidden" : ""} 
                        ${index > 2 ? "hidden max-lg:block" : ""}
                    `}
                >
                    <FlagItem title={flag} />
                </div>
            ))}
        </div>
    );
};

export default FlagList;