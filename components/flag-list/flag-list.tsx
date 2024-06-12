import { Product } from "@/types";
import FlagItem from "../flag-item/flag-item";

interface IFlagList {
    data: Product;
    className: string;
}

const FlagList: React.FC<IFlagList> = ({ data, className }) => {
    const flagKeys = Object.keys(data.acf).filter(key => key.startsWith('flag_')) as Array<keyof typeof data.acf>;
    const flagValues = flagKeys.map(key => data.acf[key]);

    return (
        <div className={className}>
            {flagValues.map(flag => (
                <FlagItem key={flag} title={flag} />
            ))}
        </div>
    )
}

export default FlagList;
