'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from "../header.module.scss";


const Offer = () => {
    const [openOffer, setOpenOffer] = useState(false);

    useEffect(() => {
        const hideTime = localStorage.getItem('hideOfferTime');
        if (!hideTime) {
            // Если в localStorage нет записи о скрытии, отображаем предложение
            setOpenOffer(true);
        } else {
            const currentTime = new Date();
            const timePassed = (currentTime.getTime() - new Date(parseInt(hideTime)).getTime()) / (1000 * 60 * 60);

            if (timePassed >= 24) {
                // Если прошло больше 24 часов, удаляем запись и показываем предложение
                localStorage.removeItem('hideOfferTime');
                setOpenOffer(true);
            }
        }
    }, []);


    const hideOffer = () => {
        const currentTime = new Date();
        // Записываем время скрытия предложения в localStorage
        localStorage.setItem('hideOfferTime', currentTime.getTime().toString());
        setOpenOffer(false);
    };

    return (
        <div className={`${styles.offer} ${!openOffer && "!hidden"} `}>
            <p>10% скидка на первый заказ</p>
            <Link href={"/shop"} className={styles.button}>
                Сюда
            </Link>
            <button className={styles.close} onClick={hideOffer}>
                <Image
                    src={"/icons/Icon/Close-white.svg"}
                    alt="close"
                    width={28}
                    height={28}
                    className="max-sm:w-5 max-sm:h-5"
                />
            </button>
        </div>
    )
}

export default Offer