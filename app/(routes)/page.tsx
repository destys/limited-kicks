import getPage from "@/actions/get-page";
import getAcfOptions from "@/actions/get-acf-options";
import getProducts from "@/actions/get-products";

import MainBanner from "@/components/main-banner/main-banner";
import Ticker from "@/components/ticker/ticker";
import Listing from "@/components/listing/listing";
import Brands from "@/components/brands/brands";
import Banner from "@/components/banner/banner";
import BlogSlider from "@/components/blog-slider-wrapper/blog-slider-wrapper";
import getPosts from "@/actions/get-posts";
import BlogSliderWrapper from "@/components/blog-slider-wrapper/blog-slider-wrapper";

export default async function HomePage() {
  const pageData = await getPage('45');
  const siteOptions = await getAcfOptions();
  const listing_1 = await getProducts({ include: siteOptions?.acf?.listing_1?.products });

  return (
    <>
      <MainBanner data={pageData?.acf?.bannery} />
      <Ticker />
      <Listing data={listing_1.data} title={siteOptions?.acf?.listing_1?.title} titleTag="h1" />
      <Brands />
      <Listing data={listing_1.data} title={siteOptions?.acf?.listing_1?.title} titleTag="h2" />
      <Banner data={siteOptions?.acf?.banner_dlya_pk} />
      <Listing data={listing_1.data} title={siteOptions?.acf?.listing_1?.title} titleTag="h2" />
      <BlogSliderWrapper />
    </>
  );
}

