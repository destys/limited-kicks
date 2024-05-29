import Image from 'next/image';

interface IFlagItem {
    title?: string
}

const FlagItem: React.FC<IFlagItem> = ({ title }) => {
    if (!title) {
        return null;
    }
    
    return (
        <div className="flex items-center gap-2 py-1 px-3 w-fit bg-main rounded-lg text-white text-xs md:xs:text-sm md:text-base">
            <Image src={"/icons/Icon/Fire-white.svg"} width={20} height={20} alt="Fire" />
            <span className="uppercase">{title}</span>
        </div>
    )
}

export default FlagItem;