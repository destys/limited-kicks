import { IMenuItem } from "@/types";
import Link from "next/link";

interface IMenuProps {
    title?: string;
    titleClassList?: string;
    containerClassList?: string;
    menuClassList?: string;
    menuItemClassList?: string;
    data: IMenuItem[];
}

const Menu: React.FC<IMenuProps> = ({
    title,
    containerClassList,
    menuClassList,
    menuItemClassList,
    data,
}) => {

    return (
        <div className={containerClassList}>
            {title && <div className="mb-5 font-mediun text-2xl">{title}</div>}
            <ul className={menuClassList}>
                {data.map((item) => (
                    <li key={item.id} className={`${menuItemClassList} hover:text-main`}>
                        <Link href={`${item.url.replace('https://admin.limited-kicks.ru', '')}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;