import { Product } from '@/types'
import styles from './product-tabs.module.scss'

const Description = ({ data }: { data: Product }) => {
    return (
        <div>
            <h2>{data.acf.h2_zagolovok}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.description }} className={styles.description} />
        </div>
    )
}

export default Description