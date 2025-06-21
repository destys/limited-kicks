import Link from "next/link";
import Image from "next/image";

import Price from "../price/price";
import FlagList from "../flag-list/flag-list";
import styles from "./product-item.module.scss";
import { Product } from "@/types";

interface IProductItem {
    data: Product;
}

// Функция для извлечения числового значения из строки размера
const extractNumber = (size: any): any | 0 => {
    const match = size.match(/(\d+(\.\d+)?)/); // Регулярное выражение для чисел и дробей
    return match ? parseFloat(match[0]) : 0;
};

const ProductItem: React.FC<IProductItem> = ({ data }) => {
    console.log('data: ', data);
    // Проверяем наличие attributes и options
    const hasSizes = data.attributes?.[0]?.options && Array.isArray(data.attributes[0].options);
    const sortedSizes = hasSizes ? [...data.attributes[0].options].sort((a, b) => extractNumber(a) - extractNumber(b)) : [];

    return (
        <article className={styles.product + " group"}>
            <div className={styles.wrapper}>
                <Link href={`/product/${data.slug}`}>
                    {data?.acf?.flag_1 && <FlagList data={data} className={styles.flags} />}
                    <div className={styles.image}>
                        <Image
                            src={data.images?.[0]?.src || data.image || '/images/image-placeholder.png'}
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
                {/* {data.type === 'variable' && hasSizes && sortedSizes.length > 0 && (
                    <Link href={`/product/${data.slug}`} className={styles.sizes + " lg:group-hover:grid"}>
                        <div className={styles.sizeTitle}>Доступные размеры:</div>
                        <div className={styles.sizeList}>
                            {sortedSizes.map(item => (
                                <button key={item} className={styles.sizeItem}>{item}</button>
                            ))}
                        </div>
                    </Link>
                )} */}
            </div>
        </article>
    );
}

export default ProductItem;