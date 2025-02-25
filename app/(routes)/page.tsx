import getPage from "@/actions/get-page";
import getAcfOptions from "@/actions/get-acf-options";
import getPosts from "@/actions/get-posts";
import getBrands from "@/actions/get-brands";

import MainBanner from "@/components/main-banner/main-banner";
import Ticker from "@/components/ticker/ticker";
import Listing from "@/components/listing/listing";
import Brands from "@/components/brands/brands";
import Banner from "@/components/banner/banner";

import BlogSlider from "@/components/blog-slider/blog-slider";
import ProductsOnRequest from "@/components/products-on-request/products-on-request";
import getProductsListing from "@/actions/get-products-listing";

export async function generateMetadata() {
  const page = await getPage('krossovki');

  if (!page.length) return null;

  const yoast_head_json = page[0].yoast_head_json;

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
    verification: {
      yandex: "b7d5aedbbbe984af",
    },
  }
}

export default async function HomePage() {
  const pageData = await getPage('krossovki');
  const siteOptions = await getAcfOptions();
  const listing_1 = await getProductsListing({ include: siteOptions?.acf?.listing_1?.products?.join() });
  const listing_2 = await getProductsListing({ include: siteOptions?.acf?.listing_2?.products?.join() });
  const listing_3 = await getProductsListing({ include: siteOptions?.acf?.listing_3?.products?.join() });
  const posts = await getPosts('?per_page=8&orderby=date&_embed=true');
  const brands = await getBrands();

  return (
    <>
      <MainBanner data={pageData[0]?.acf?.bannery} />
      <Ticker />
      <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h1" link={siteOptions?.acf?.listing_1.ssylka} />
      <Brands data={brands} />
      <Listing data={listing_2} title={siteOptions?.acf?.listing_2?.title} titleTag="h2" link={siteOptions?.acf?.listing_2.ssylka} />
      <Listing data={listing_3} title={siteOptions?.acf?.listing_3?.title} titleTag="h2" link={siteOptions?.acf?.listing_3.ssylka} />
      <ProductsOnRequest data={siteOptions?.acf.tovary_po_zaprosu} />
      <BlogSlider data={posts} />
      <Banner data={siteOptions?.acf?.bannery} />
    </>
  );
}

