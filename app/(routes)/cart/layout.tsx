import { ReactNode } from "react";

import getAcfOptions from "@/actions/get-acf-options";
import getProducts from "@/actions/get-products";

import Banner from "@/components/banner/banner";
import Listing from "@/components/listing/listing";
import Ticker from "@/components/ticker/ticker";

type Props = {
    children: ReactNode;
}

const CartLayout = async (props: Props) => {
    const siteOptions = await getAcfOptions();
    const listing_1 = await getProducts({ include: siteOptions?.acf?.listing_1?.products });
    const listing_2 = await getProducts({ include: siteOptions?.acf?.listing_2?.products });
    return (
        <>
            <section className="max-w-[1070px] mx-auto">
                {props.children}
            </section>
            <Ticker />
            <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} />
            <Banner data={siteOptions?.acf?.bannery} />
            <Listing data={listing_2} title={siteOptions?.acf?.listing_2?.title} />
        </>
    )
}

export default CartLayout;
