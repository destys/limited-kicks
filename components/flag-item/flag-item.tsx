import Image from "next/image";

interface IFlagItem {
    title?: string;
}

// Мапа соответствий флагов и их иконок
const iconMap: Record<string, string> = {
    "60 MIN": "/flags/delivery.svg",
    "TOP": "/flags/new.svg",
    "NEW": "/flags/new.svg",
    "SALE": "/flags/sale.svg",
};

const FlagItem: React.FC<IFlagItem> = ({ title }) => {
    if (!title) return null;

    const iconPath = iconMap[title] || null;

    return (
        <div className="flex items-center gap-2 py-1 px-3 w-fit bg-main rounded-lg text-white text-xs xs:text-sm md:text-base">
            {iconPath && (
                <Image src={iconPath} width={20} height={20} alt={title} unoptimized />
            )}
            <span className="uppercase">{title}</span>
        </div>
    );
};

export default FlagItem;