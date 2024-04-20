'use client';
import Image from "next/image";
import Link from "next/link";

import styles from "./app-bar.module.scss";
import useMobileSearch from "@/hooks/use-mobile-search";

export default function AppBar() {
  const mobileSearch = useMobileSearch();

  return (
    <div className={styles.appBar}>
      <nav className={styles.appBar__nav}>
        <ul className={styles.appBar__list}>
          <li>
            <Link href={"/"}>
              <Image
                src={"/icons/Icon/menu-burger.svg"}
                width={20}
                height={20}
                alt="menu burger"
                className="text-black"
              />
            </Link>
          </li>
          <li>
            <Link href={"/favorites"}>
              <Image
                src={"/icons/Icon/Heart.svg"}
                width={20}
                height={20}
                alt="heart"
                className="text-black"
              />
            </Link>
          </li>
          <li className="flex justify-center items-center bg-main rounded-full -translate-y-[10px] w-[52px] h-[52px]" onClick={mobileSearch.onOpen}>
            <Image
              src={"/icons/Icon/Search_type 1.svg"}
              width={20}
              height={20}
              alt="Search"
              className="text-black"
            />
          </li>
          <li>
            <Link href={"/cart"}>
              <Image
                src={"/icons/Icon/Bag.svg"}
                width={20}
                height={20}
                alt="Bag"
                className="text-black"
              />
            </Link>
          </li>
          <li>
            <Link href={"/profile"}>
              <Image
                src={"/icons/Icon/profile.svg"}
                width={20}
                height={20}
                alt="profile"
                className="text-black"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
