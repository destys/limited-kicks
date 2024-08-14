import Link from 'next/link';
import styles from './tag-cloud.module.scss';
import { Tag } from '@/types';

interface ITagCloud {
    data: Tag[];
    wrapper?: keyof JSX.IntrinsicElements;
    className?: string;
}

const TagCloud: React.FC<ITagCloud> = ({ data, wrapper, className }) => {
    if (!data) {
        return null;
    }

    const Wrapper = wrapper || 'section';
    return (
        <Wrapper className={className}>
            {wrapper !== 'div' && (<div className={styles.tagCloud__top}>
                <h2 className={styles.tagCloud__title}>Смотрите так же</h2>
                <div className="flex items-center gap-10">
                    <Link href={"/products"} className={styles.tagCloud__showMore}>
                        Смотреть все
                    </Link>
                </div>
            </div>)}

            <div className={styles.tagCloud__list}>
                {data.map((item) => (
                    <Link href={`/tag/${item.slug}`} key={item.term_id} className="flex items-center gap-3 w-fit flex-shrink-0 py-3 px-5 bg-add_1 rounded-lg hover:bg-add_1_hv text-sm lg:text-base">{item.name}</Link>
                ))}
            </div>
        </Wrapper>
    )
}

export default TagCloud