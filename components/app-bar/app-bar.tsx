'use client';
import Image from "next/image";
import Link from "next/link";

import styles from "./app-bar.module.scss";
import useMobileSearch from "@/hooks/use-mobile-search";
import useMainMenu from "@/hooks/use-main-menu";
import useShoppingCart from "@/hooks/use-cart";
import useFavoriteStore from "@/hooks/use-favorite";

export default function AppBar() {
  const mobileSearch = useMobileSearch();
  const { items } = useShoppingCart();
  const { favorites } = useFavoriteStore();
  console.log('favorites: ', favorites);
  const { onOpen } = useMainMenu();

  return (
    <div className={styles.appBar}>
      <nav className={styles.appBar__nav}>
        <ul className={styles.appBar__list}>
          <li onClick={onOpen}>
            <Image
              src={"/icons/Icon/menu-burger.svg"}
              width={20}
              height={20}
              alt="menu burger"
              className="text-black"
            />
          </li>
          <li>
            <Link href={"/favorites"} className="relative">
              <Image
                src={"/icons/Icon/Heart.svg"}
                width={20}
                height={20}
                alt="heart"
                className="text-black"
              />
              {!!favorites.length && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
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
            <Link href={"/cart"} className="relative">
              <Image
                src={"/icons/Icon/Bag.svg"}
                width={20}
                height={20}
                alt="Bag"
                className="text-black"
              />
              {!!items.length && (
                <span className={styles.badge}>{items.length}</span>
              )}
            </Link>
          </li>
          <li>
            <Link href={"/auth"}>
              <Image
                src={"/icons/Icon/Profile.svg"}
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
