import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

import useFavoriteStore from "@/hooks/use-favorite";

import FavoritesActions from "./favorites-actions";

import styles from "./favorites-item.module.scss";
import FlagItem from "@/components/flag-item/flag-item";
import Price from "@/components/price/price";

interface IProductItem {
    data: Product;
}

const FavoritesItem: React.FC<IProductItem> = ({ data }) => {
    const { removeFavorite } = useFavoriteStore();

    const handleDeleteItemFromFavorites = () => {
        removeFavorite(data.id)
    }

    return (
        <article className={styles.product}>
            <button type="button" onClick={handleDeleteItemFromFavorites} className="flex justify-center items-center absolute top-3 left-2 z-10 rounded-full bg-add_1 w-6 h-6">
                <Image src="Icon/Close.svg" width={18} height={18} alt="Delete from favorites" objectFit="contain" />
            </button>
            <Link href={`/product/${data.slug}`}>
                {data?.acf?.flag_1 && (
                    <div className={styles.flags}>
                        <FlagItem title={data?.acf?.flag_1} />
                        <FlagItem title={data?.acf?.flag_2} />
                    </div>
                )}
                <div className={styles.image}>
                    <Image
                        src={data.images[0].src}
                        width={400}
                        height={240}
                        alt={data.name}
                        className="object-contain hover:scale-105 transition-transform"
                    />
                </div>
            </Link>
            <div className={styles.content}>
                <h3 className="mb-2 max-md:text-base max-xs:text-[10px] max-xs:leading-tight hover:text-main transition-colors">
                    <Link href={`/product/${data.slug}`}>
                        {data.name}
                    </Link>
                </h3>
                <div className="price max-md:text-xs">
                    {data.price ? <Price before="от" value={data.price} /> : "По запросу"}
                </div>
            </div>
            <FavoritesActions />
        </article >
    );
}

export default FavoritesItem