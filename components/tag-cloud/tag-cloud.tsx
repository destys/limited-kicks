import Link from 'next/link';
import styles from './tag-cloud.module.scss';



const TagCloud = ({ title }: { title?: string }) => {
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <section>
            <div className={styles.tagCloud__top}>
                <h2 className={styles.tagCloud__title}>{title || "Смотрите так же"}</h2>
                <div className="flex items-center gap-10">
                    <Link href={"/products"} className={styles.tagCloud__showMore}>
                        Смотреть все
                    </Link>
                </div>
            </div>
            <div className={styles.tagCloud__list}>
                {data.map((item, index) => (
                    <Link href={'/shop'} key={index} className="py-3 px-5 rounded-lg bg-add_1 hover:bg-add_1_hv">Nike Dunk</Link>
                ))}
            </div>
        </section>
    )
}

export default TagCloud