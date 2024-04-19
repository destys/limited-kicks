import Link from 'next/link';
import styles from './tag-cloud.module.scss';
import { Tag } from '@/types';

interface ITagCloud {
    data: Tag[]
}

const TagCloud: React.FC<ITagCloud> = ({ data }) => {
    return (
        <section>
            <div className={styles.tagCloud__top}>
                <h2 className={styles.tagCloud__title}>Смотрите так же</h2>
                <div className="flex items-center gap-10">
                    <Link href={"/products"} className={styles.tagCloud__showMore}>
                        Смотреть все
                    </Link>
                </div>
            </div>
            <div className={styles.tagCloud__list}>
                {data.map((item) => (
                    <Link href={`/tag/${item.slug}`} key={item.term_id} className="py-3 px-5 rounded-lg bg-add_1 hover:bg-add_1_hv">{item.name}</Link>
                ))}
            </div>
        </section>
    )
}

export default TagCloud