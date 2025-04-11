import Link from 'next/link'

import getProduct from '@/actions/get-product';

import styles from "./crumbs.module.scss";

interface ICrumbs {
    type?: string;
    id?: number;
    slug?: string;
    parentCategory?: any;
    data?: any;
}

const Crumbs: React.FC<ICrumbs> = async ({ type, parentCategory, data }) => {
    
    let crumbs;

    if (type === 'product') {
        crumbs = [
            { text: "Главная", link: "/" },
            { text: "Каталог", link: "/shop" },
            { text: data.categories[0].name, link: `/category/${data.categories[0].slug}` },
            { text: data.name },
        ];
    } else if (type === 'category') {
        crumbs = [
            { text: "Главная", link: "/" },
            { text: "Каталог", link: "/shop" },
            { text: data.name }
        ];
    } else {
        crumbs = [
            { text: "Главная", link: "/" },
            { text: data?.title?.rendered || "Хлебые крошки не настроены для данного типа страницы" },
        ];
    }

    return (
        <div className={styles.breadcrumbs}>
            {crumbs?.map((crumb, index) => (
                <span key={index} className={styles.item}>
                    {crumb.link ? (
                        <Link href={crumb.link} className={styles.link}>
                            {crumb.text}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                            >
                                <path
                                    d="M5.66602 4.25C5.66602 4.11845 5.70265 3.98951 5.7718 3.87761C5.84096 3.76571 5.93991 3.67528 6.05757 3.61645C6.17523 3.55762 6.30695 3.53271 6.43796 3.54453C6.56898 3.55634 6.69411 3.60441 6.79935 3.68333L12.466 7.93333C12.554 7.99931 12.6254 8.08487 12.6746 8.18322C12.7237 8.28158 12.7493 8.39003 12.7493 8.5C12.7493 8.60996 12.7237 8.71842 12.6746 8.81678C12.6254 8.91513 12.554 9.00069 12.466 9.06667L6.79935 13.3167C6.69411 13.3956 6.56898 13.4437 6.43796 13.4555C6.30695 13.4673 6.17523 13.4424 6.05757 13.3836C5.93991 13.3247 5.84096 13.2343 5.7718 13.1224C5.70265 13.0105 5.66602 12.8815 5.66602 12.75V4.25Z"
                                    fill="black"
                                />
                            </svg>
                        </Link>
                    ) : (
                        <span>{crumb.text}</span>
                    )}
                </span>
            ))}
        </div>
    )
}

export default Crumbs