'use client';

import Button from "../ui/button/button";
import styles from "./favorites-item.module.scss";

type Props = {}

const FavoritesActions = (props: Props) => {
    return (
        <div className="grid gap-4">
            <Button styled="filled" className="w-full">Купить в 1 клик</Button>
            <Button styled="filled" className="w-full bg-add_1 text-black border-add_1">Добавить в корзину</Button>
        </div>
    )
}

export default FavoritesActions