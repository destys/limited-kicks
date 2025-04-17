import Image from "next/image";
import Link from "next/link";

import getMenu from "@/actions/get-menu";

import Search from "@/components/search/search";
import Offer from "./components/offer";
import Actions from "./components/actions";

import styles from "./header.module.scss";
import MenuButton from "./components/menu-button";
import MobileLogo from "./components/mobile-logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className="flex justify-center w-full lg:w-auto lg:justify-start lg:items-center">
          <MenuButton />
          <Link
            href={"/"}
            className="lg:mr-5 2xl:mr-11 min-w-[64px] xl:min-w-[150px]"
          >
            <Image
              src="/logo.svg"
              alt="logotype"
              width={151}
              height={68}
              className="max-w-[64px] sm:max-w-[128px] lg:max-w-none"
            />
          </Link>
          <div className={styles.menu}>
            <Link href="/shop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  opacity="0.5"
                  d="M5.51673 18.8264C3.71361 17.0233 2.81204 16.1217 2.47658 14.952C2.1411 13.7823 2.4278 12.54 3.00119 10.0553L3.33186 8.62238C3.81426 6.53199 4.05546 5.48678 4.77118 4.77106C5.48691 4.05534 6.5321 3.81413 8.6225 3.33174L10.0554 3.00107C12.5401 2.42768 13.7825 2.14098 14.9522 2.47646C16.1219 2.81192 17.0235 3.71348 18.8265 5.5166L20.9611 7.65118C24.0982 10.7883 25.6668 12.3569 25.6668 14.3061C25.6668 16.2552 24.0982 17.8238 20.9611 20.961C17.8239 24.0981 16.2553 25.6667 14.3062 25.6667C12.357 25.6667 10.7885 24.0981 7.65131 20.961L5.51673 18.8264Z"
                  stroke="#060F2F"
                  strokeWidth="2"
                />
                <path
                  d="M17.9544 17.9539C18.6379 17.2705 18.7301 16.2548 18.1607 15.6852C17.5911 15.1158 16.5754 15.2081 15.892 15.8915C15.2087 16.5749 14.193 16.6673 13.6234 16.0978C13.0538 15.5282 13.1462 14.5125 13.8297 13.8292M17.9544 17.9539L18.367 18.3663M17.9544 17.9539C17.4866 18.4218 16.8631 18.6126 16.3336 18.5038M13.8297 13.8292L13.4171 13.4166M13.8297 13.8292C14.2161 13.4427 14.7088 13.2453 15.1669 13.2496"
                  stroke="#060F2F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6914 12.0087C12.6027 11.0975 12.6027 9.62007 11.6914 8.70885C10.7802 7.79763 9.30284 7.79763 8.39161 8.70885C7.48039 9.62007 7.48039 11.0975 8.39161 12.0087C9.30284 12.9199 10.7802 12.9199 11.6914 12.0087Z"
                  stroke="#060F2F"
                  strokeWidth="2"
                />
              </svg>
              <span>Каталог</span>
            </Link>
            <Link href="/instock">
              <span>🚀</span>
              <span>от 2-х часов</span>
            </Link>
          </div>
        </div>
        <Search />
        <Actions />
      </div>
      <MobileLogo />
      {/* <Offer /> */}
    </header>
  );
}

export default Header;