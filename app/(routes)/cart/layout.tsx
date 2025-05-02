import { ReactNode } from "react";

import getAcfOptions from "@/actions/get-acf-options";

import Banner from "@/components/banner/banner";
import Listing from "@/components/listing/listing";
import Ticker from "@/components/ticker/ticker";
import TagCloud from "@/components/tag-cloud/tag-cloud";
import RecentlyViewed from "@/components/recently-viewed/recently-viewed";
import getProductsListing from "@/actions/get-products-listing";

const CartLayout = async ({ children }: { children: ReactNode }) => {
    const siteOptions = await getAcfOptions();
    const listing_1 = siteOptions?.acf?.listing_1?.products?.length
        ? await getProductsListing({ include: siteOptions.acf.listing_1.products.join() })
        : [];
    return (
        <>
            <section className="max-w-[1070px] mx-auto">
                {children}
            </section>
            <RecentlyViewed />
            <Ticker />
            {!!listing_1 && <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} link={siteOptions?.acf?.listing_1.ssylka} />}
            <Banner data={siteOptions?.acf?.bannery} />
            <TagCloud data={siteOptions?.acf.oblako_metok} />
        </>
    )
}

export default CartLayout;
