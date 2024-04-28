import { ResolvingMetadata } from "next";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import getAcfOptions from "@/actions/get-acf-options";
import CatalogContent from "@/components/catalog-content/catalog-content";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  },
  searchParams?: {
    colorId?: string;
    sizeId?: string;
  }
}

type MetaProps = {
  params: { categorySlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
) {
  const category = await getCategories(params.categorySlug);
  const yoast_head_json = category[0].yoast_head_json;

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

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const siteOptions = await getAcfOptions();
  const category = await getCategories({ slug: params.categorySlug });
  const products = await getProducts({ category: category[0].id });

  return (
    <>
      <CatalogContent products={products} category={category[0]} title={category[0].name} excerpt={category[0].acf?.korotkoe_opisanie} description={category[0].description} tagCloud={siteOptions?.acf?.oblako_metok} categoryTags={category[0].acf?.metki_pod_zagolovkom} />
    </>
  );
}

export default CategoryPage;