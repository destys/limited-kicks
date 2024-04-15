'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from "../header.module.scss";


const Offer = () => {
    const [openOffer, setOpenOffer] = useState(true);
    return (
        <div className={`${styles.offer} ${!openOffer && "!hidden"} `}>
            <p>10% скидка на первый заказ</p>
            <Link href={"/shop"} className={styles.button}>
                Сюда
            </Link>
            <button className={styles.close} onClick={() => setOpenOffer(false)}>
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