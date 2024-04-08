import getAcfOptions from "@/actions/get-acf-options";

import Banner from "@/components/banner/banner";
import Ticker from "@/components/ticker/ticker";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const CartLayout = async (props: Props) => {
    const siteOptions = await getAcfOptions();
    return (
        <>
            <section className="max-w-[1070px] mx-auto">
                {props.children}
            </section>
            <Ticker />
            {/* <Listing data={listing} title="Вам также понравится" /> */}
            <Banner data={siteOptions?.acf?.banner_dlya_pk} />
            {/* <Listing data={listing} title="Смотрите также" /> */}
        </>
    )
}

export default CartLayout;
