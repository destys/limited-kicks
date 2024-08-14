"use client"

import { useEffect } from "react";

interface IAddtoRecently {
    id: number;
}

const AddToRecently: React.FC<IAddtoRecently> = ({ id }) => {
    useEffect(() => {
        let recentlyViewed = localStorage.getItem('recently');
        let recentlyViewedArray: number[] = recentlyViewed ? recentlyViewed.split(',').map(Number) : [];
        recentlyViewedArray = recentlyViewedArray.filter(itemId => itemId !== id);
        recentlyViewedArray.unshift(id);
        if (recentlyViewedArray.length > 8) {
            recentlyViewedArray.pop();
        }
        localStorage.setItem('recently', recentlyViewedArray.join(','));
    }, [id]);

    return null;
}

export default AddToRecently;
