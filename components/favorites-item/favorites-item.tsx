import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

import FlagItem from "../flag-item/flag-item";
import Price from "../price/price";
import FavoritesActions from "./favorites-actions";

import styles from "./favorites-item.module.scss";

interface IProductItem {
    data: Product;
}

const FavoritesItem: React.FC<IProductItem> = ({ data }) => {
    return (
        <article className={styles.product}>
            <Link href={`/product/${data.slug}`}>
                {data?.new && (
                    <div className={styles.flags}>
                        <FlagItem title="new" />
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
        </article>
    );
}

export default FavoritesItem