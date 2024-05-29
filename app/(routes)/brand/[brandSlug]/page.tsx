import { ResolvingMetadata } from "next";
import getProducts from "@/actions/get-products";
import getBrands from "@/actions/get-brands";
import getAcfOptions from "@/actions/get-acf-options";

import CatalogContent from "@/components/catalog-content/catalog-content";
import getAttributes from "@/actions/get-attributes";

interface CategoryPageProps {
  params: {
    brandSlug: string;
    categorySlug: string;
  },
  searchParams?: {
    colorId?: string;
    sizeId?: string;
  }
}

type MetaProps = {
  params: { brandSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: MetaProps
) {
  const brand = await getBrands(params.brandSlug);
  const yoast_head_json = brand[0].yoast_head_json;

  return {
    title: yoast_head_json.title, // Если у продукта есть свое собственное название, используйте его, в противном случае используйте название из yoast_head_json
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

const CategoryPage: React.FC<CategoryPageProps> = async ({ params, searchParams }) => {
  const siteOptions = await getAcfOptions();
  const brand = await getBrands(params.brandSlug);

  const brandAttributes = await getAttributes(4);

  const currentTerm = brandAttributes.find(term => term.slug === params.brandSlug);


  const products = await getProducts(
    {
      attribute: "pa_brand",
      attribute_term: currentTerm?.id,
      ...searchParams
    }
  );

  return (
    <>
      <CatalogContent category={brand[0]} products={products} title={brand[0].name} excerpt={brand[0].acf?.korotkoe_opisanie} description={brand[0].description} tagCloud={siteOptions?.acf.oblako_metok} />
    </>
  );
}

export default CategoryPage;