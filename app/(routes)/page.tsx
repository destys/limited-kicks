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

export async function generateMetadata() {
  const shop = await getPage("45");
  const yoast_head_json = shop.yoast_head_json;

  return {
    title: yoast_head_json.title,
    description: yoast_head_json.description,
    canonical: yoast_head_json.canonical,
    openGraph: {
      type: yoast_head_json.og_type,
      locale: yoast_head_json.og_locale,
      url: yoast_head_json.og_url,
      title: yoast_head_json.og_title,
      description: yoast_head_json.og_description,
      site_name: yoast_head_json.og_site_name,
    },
    twitter: {
      cardType: yoast_head_json.twitter_card,
    },
  }
}

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

