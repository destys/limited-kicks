import getAcfOptions from "@/actions/get-acf-options";
import getAttributes from "@/actions/get-attributes";

import CatalogContent from "@/components/catalog-content/catalog-content";
import getBrand from "@/actions/get-brand";
import { generateYoastMetadata } from "@/utils/meta-data";

interface IBrandsPage {
  params: {
    brandSlug: string;
    categorySlug: string;
  },
  searchParams: {}
}

type MetaProps = {
  params: { brandSlug: string }
}

export async function generateMetadata(
  { params }: MetaProps
) {
  const brand = await getBrand(params.brandSlug);
  const yoast_head_json = brand[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const BrandPage: React.FC<IBrandsPage> = async ({ params, searchParams }) => {
  const siteOptions = await getAcfOptions();
  const brand = await getBrand(params.brandSlug);

  const brandAttributes = await getAttributes(4);
  const currentTerm = brandAttributes.find(term => term.slug === params.brandSlug);

  console.log('siteOptions?.acf?.oblako_metok: ', siteOptions?.acf?.oblako_metok);

  const query = {
    attribute: "pa_brand",
    attribute_term: currentTerm?.id,
    per_page: 12,
    page: 1,
  }

  return (
    <CatalogContent
      count={brand[0].count}
      query={query}
      category={brand[0]}
      title={brand[0].name}
      excerpt={brand[0].acf?.korotkoe_opisanie}
      description={brand[0].description}
      tagCloud={siteOptions?.acf?.oblako_metok}
      categoryTags={brand[0].acf?.metki_pod_zagolovkom}
      searchParams={searchParams}
    />
  );
}

export default BrandPage; 
