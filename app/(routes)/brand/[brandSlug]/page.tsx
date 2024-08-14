import getAcfOptions from "@/actions/get-acf-options";
import getAttributes from "@/actions/get-attributes";

import CatalogContent from "@/components/catalog-content/catalog-content";
import getBrand from "@/actions/get-brand";
import { generateYoastMetadata } from "@/utils/meta-data";
import getTagsCloud from "@/actions/get-tags-cloud";
import NotFound from "@/app/not-found";

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

  if (!brand.length) {
    return {
      title: '404',
      description: '404',
      image: '',
      url: '',
      type: 'website',
    };
  }

  const yoast_head_json = brand[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const BrandPage: React.FC<IBrandsPage> = async ({ params, searchParams }) => {
  const siteOptions = await getAcfOptions();
  const brand = await getBrand(params.brandSlug);

  if (!brand.length) {
    return <NotFound />;
  }

  const brandAttributes = await getAttributes(9);
  const currentTerm = brandAttributes.find(term => term.slug === params.brandSlug);

  const query = {
    attribute: "pa_brand",
    attribute_term: currentTerm?.id,
    per_page: 12,
    page: 1,
  }

  const tagsCloud = await getTagsCloud('pa_brand', currentTerm?.id);

  return (
    <CatalogContent
      count={brand[0].count}
      query={query}
      category={brand[0]}
      title={brand[0].name}
      excerpt={brand[0].acf?.korotkoe_opisanie}
      description={brand[0].description}
      tagCloud={siteOptions?.acf?.oblako_metok}
      categoryTags={tagsCloud}
      searchParams={searchParams}
    />
  );
}

export default BrandPage; 
