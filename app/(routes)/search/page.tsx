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

const Search = async () => {
  const siteOptions = await getAcfOptions();
  const listing_1 = await getProductsListing({ include: [siteOptions?.acf?.listing_1?.products] });
  const listing_2 = await getProductsListing({ include: [siteOptions?.acf?.listing_2?.products] });
  const listing_3 = await getProductsListing({ include: [siteOptions?.acf?.listing_3?.products] });
  const posts = await getPosts('?per_page=8&orderby=date&_embed=true');
  const brands = await getBrands();

  return (
    <>
      <SearchListing />
      <Ticker />
      <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} />
      <Brands data={brands} />
      <Listing data={listing_2} title={siteOptions?.acf?.listing_2?.title} />
      <Banner data={siteOptions?.acf?.bannery} />
      <Listing data={listing_3} title={siteOptions?.acf?.listing_3?.title} />
      <BlogSlider data={posts} />
    </>
  );
}

export default Search