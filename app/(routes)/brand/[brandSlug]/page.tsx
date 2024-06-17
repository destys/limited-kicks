import getProducts from "@/actions/get-products";
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

  const initialProducts = await getProducts({
    attribute: "pa_brand",
    attribute_term: currentTerm?.id,
    per_page: 24,
    page: 1,
    ...searchParams
  });

  return (
    <CatalogContent
      category={brand[0]}
      initialProducts={initialProducts}
      title={brand[0].name}
      excerpt={brand[0].acf?.korotkoe_opisanie}
      description={brand[0].description}
      tagCloud={siteOptions?.acf.oblako_metok}
      searchParams={searchParams}
    />
  );
}

export default BrandPage;
