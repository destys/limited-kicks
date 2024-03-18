import getPage from "@/actions/get-page";
import getAcfOptions from "@/actions/get-acf-options";
import getProducts from "@/actions/get-products";

import MainBanner from "@/components/main-banner/main-banner";
import Ticker from "@/components/ticker/ticker";
import Listing from "@/components/listing/listing";
import Brands from "@/components/brands/brands";
import Banner from "@/components/banner/banner";

import getPosts from "@/actions/get-posts";
import BlogSlider from "@/components/blog-slider/blog-slider";

export default async function HomePage() {
  const pageData = await getPage('45');
  const siteOptions = await getAcfOptions();
  const listing_1 = await getProducts({ include: siteOptions?.acf?.listing_1?.products });
  const posts = await getPosts('?per_page=4&orderby=date&_embed=true');

  return (
    <>
      <MainBanner data={pageData?.acf?.bannery} />
      <Ticker />
      <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h1" />
      <Brands />
      <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h2" />
      <Banner data={siteOptions?.acf?.banner_dlya_pk} />
      <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h2" />
      <BlogSlider data={posts} />
    </>
  );
}

