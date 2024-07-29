import { Product } from '@/types'
import styles from './product-tabs.module.scss'

interface IDetails {
    data: Product;
}

const Details: React.FC<IDetails> = ({ data }) => {
    return (
        <div className={styles.attributes}>
            <div className={styles.item}>
                <strong className="text-lg">SKU</strong>
                <span>{data.sku}</span>
            </div>
            {data.acf.data_reliza && <div className={styles.item}>
                <strong className="text-lg">Дата релиза</strong>
                <span>{data.acf.data_reliza}</span>
            </div>}
            <div className={styles.item}>
                <strong className="text-lg">Цвет</strong>
                <span>Titanium/Dark Smoke Gray-Sail</span>
            </div>
        </div>
    )
}

export default Details