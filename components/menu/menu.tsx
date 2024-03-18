import Link from "next/link";

export default function Menu({
    title,
    containerClassList,
    menuClassList,
    menuItemClassList,
    items,
}) {
    return (
        <div className={containerClassList}>
            {title && <div className="mb-5 font-mediun text-2xl">{title}</div>}
            <ul className={menuClassList}>
                {items.map((item) => (
                    <li key={item.id} className={`${menuItemClassList} hover:text-main`}>
                        <Link href="#">{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
