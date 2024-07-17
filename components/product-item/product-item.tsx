import Link from "next/link";
import Image from "next/image";

import Price from "../price/price";

import styles from "./product-item.module.scss";
import { Product } from "@/types";
import FlagList from "../flag-list/flag-list";

interface IProductItem {
    data: Product;
}

const ProductItem: React.FC<IProductItem> = ({ data }) => {
    return (
        <article className={styles.product + " group"}>
            <div className={styles.wrapper}>
                <Link href={`/product/${data.slug}`}>
                    {data?.acf.flag_1 && <FlagList data={data} className={styles.flags} />}
                    <div className={styles.image}>
                        <Image
                            src={data.images[0]?.src || '/images/image-placeholder.png'}
                            width={400}
                            height={240}
                            alt={data.name}
                            className="object-contain"
                        />
                    </div>
                    <div className={styles.content}>
                        <h3 className="mb-2 max-md:text-base max-xs:text-[10px] max-xs:leading-tight">{data.name}</h3>
                        <div className="price max-md:text-xs">
                            {data.price ? <Price before="от" value={data.price} /> : "По запросу"}
                        </div>
                    </div>
                </Link>
                {data.type === 'variable' && (
                    <Link href={`/product/${data.slug}`} className={styles.sizes + " group-hover:grid"}>
                        <div className={styles.sizeTitle}>Доступные размеры:</div>
                        <div className={styles.sizeList}>
                            {data.attributes[0].options.map(item => (
                                <button key={item} className={styles.sizeItem}>{item}</button>
                            ))}
                        </div>
                    </Link>
                )}
            </div>
        </article>
    );
}

export default ProductItem