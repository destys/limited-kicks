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
//import ProductsOnRequest from "@/components/products-on-request/products-on-request";
import getProductsListing from "@/actions/get-products-listing";
import { generateYoastMetadata } from "@/utils/meta-data";
// import Head from "next/head";
import { SchemaMarkup } from "@/components/schema-markup";

export async function generateMetadata() {
  const page = await getPage(45);

  if (!page.length) return null;

  const yoast_head_json = page[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

export default async function HomePage() {
  const pageData = await getPage(45);
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
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Limited Kicks",
        "url": "https://limited-kicks.ru",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://limited-kicks.ru/search?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }} />
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Limited Kicks",
        "url": "https://limited-kicks.ru",
        "logo": "https://limited-kicks.ru/logo.png",
        "sameAs": [
          "https://t.me/LimitedKicksOfficial",
          "https://vk.com/limitedkicks",
          "https://wa.me/79951508080"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+7-995-150-80-80",
          "contactType": "customer service",
          "areaServed": "RU",
          "availableLanguage": ["Russian"]
        },
        /* "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "197"
        } */
      }} />

      <MainBanner data={pageData[0]?.acf?.bannery} />
      <Ticker />
      {!!listing_1.length && <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h1" link={siteOptions?.acf?.listing_1.ssylka} />}
      <Brands data={brands} />
      {!!listing_2.length && <Listing data={listing_2} title={siteOptions?.acf?.listing_2?.title} titleTag="h2" link={siteOptions?.acf?.listing_2.ssylka} />}
      {!!listing_3.length && <Listing data={listing_3} title={siteOptions?.acf?.listing_3?.title} titleTag="h3" link={siteOptions?.acf?.listing_3.ssylka} />}
      {/* <div className="mb-10 xl:mb-20">
        <ProductsOnRequest data={siteOptions?.acf.tovary_po_zaprosu} />
      </div> */}
      <BlogSlider data={posts} />
      <Banner data={siteOptions?.acf?.bannery} />
    </>
  );
}

