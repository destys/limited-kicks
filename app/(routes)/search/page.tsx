import getPosts from "@/actions/get-posts";
import getAcfOptions from "@/actions/get-acf-options";
import getBrands from "@/actions/get-brands";

import BlogSlider from "@/components/blog-slider/blog-slider";
import Listing from "@/components/listing/listing";
import Ticker from "@/components/ticker/ticker";
import Brands from "@/components/brands/brands";
import Banner from "@/components/banner/banner";
import SearchListing from "./components/search-listing";
import getProductsListing from "@/actions/get-products-listing";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Поиск товаров",
    description: "Поиск товаров на сайте Limited-Kicks",
  };
}

const Search = async () => {
  const siteOptions = await getAcfOptions();
  const listing_1 = siteOptions?.acf?.listing_1?.products?.length
    ? await getProductsListing({ include: siteOptions.acf.listing_1.products.join() })
    : [];

  const listing_2 = siteOptions?.acf?.listing_2?.products?.length
    ? await getProductsListing({ include: siteOptions.acf.listing_2.products.join() })
    : [];

  const listing_3 = siteOptions?.acf?.listing_3?.products?.length
    ? await getProductsListing({ include: siteOptions.acf.listing_3.products.join() })
    : [];

  const posts = await getPosts('?per_page=8&orderby=date&_embed=true');
  const brands = await getBrands();

  return (
    <>
      <Suspense fallback={null}>
        <SearchListing />
      </Suspense>
      <Ticker />
      {!!listing_1.length && <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} />}
      <Brands data={brands} />
      {!!listing_2.length && <Listing data={listing_2} title={siteOptions?.acf?.listing_2?.title} titleTag="h2" link={siteOptions?.acf?.listing_2.ssylka} />}
      <Banner data={siteOptions?.acf?.bannery} />
      {!!listing_3.length && <Listing data={listing_3} title={siteOptions?.acf?.listing_3?.title} titleTag="h2" link={siteOptions?.acf?.listing_3.ssylka} />}
      <BlogSlider data={posts} />
    </>
  );
}

export default Search