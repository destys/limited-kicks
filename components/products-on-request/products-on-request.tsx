
import { IProductsOnRequest } from '@/types';
import Image from 'next/image'

import ProductsOnRequestButton from './components/products-on-request-button';

import styles from './products-on-request.module.scss'

interface ProductsOnRequestProps {
    data: IProductsOnRequest;
}

const ProductsOnRequest: React.FC<ProductsOnRequestProps> = ({ data }) => {
    return (
        <div className={styles.onrequest}>
            <div className={styles.onrequest__wrapper}>
                <div className={styles.onrequest__content}>
                    <h2 className={styles.contentOnrequest__title}>{data.zagolovok}</h2>
                    <div dangerouslySetInnerHTML={{ __html: data.tekst }} className={styles.contentOnrequest__text} />
                    <ProductsOnRequestButton />
                </div>
                <div className={styles.productsOnrequest}>
                    <div className={styles.productsOnrequest__list}>
                        {data.tovary.map((item) => (
                            <div key={item.nazvanie} className={styles.item}>
                                <div className={styles.item__image}>
                                    <Image src={item.izobrazhenie.url} width={240} height={144} alt={item.nazvanie} />
                                </div>
                                <div className={styles.item__title}>{item.nazvanie}</div>
                                <div className={styles.item__category}>{item.kategoriya}</div>
                                <div className={styles.item__price}>{item.czena}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsOnRequest