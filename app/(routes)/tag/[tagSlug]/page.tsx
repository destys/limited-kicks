import getProducts from "@/actions/get-products";
import { ResolvingMetadata } from "next";
import TagCloud from "@/components/tag-cloud/tag-cloud";
import getAcfOptions from "@/actions/get-acf-options";
import CatalogContent from "@/components/catalog-content/catalog-content";
import getTags from "@/actions/get-tags";

interface CategoryPageProps {
  params: {
    tagSlug: any;
    categorySlug: string;
  },
  searchParams?: {
    colorId?: string;
    sizeId?: string;
  }
}

type MetaProps = {
  params: { tagSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
) {
  const tag = await getTags({ slug: params.tagSlug });
  const yoast_head_json = tag[0].yoast_head_json;

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
  const tag = await getTags({ slug: params.tagSlug });
  const products = await getProducts({ tag: tag[0].id });

  return (
    <>
      <CatalogContent category={tag[0]} products={products} title={tag[0].name} excerpt={tag[0].acf?.korotkoe_opisanie} description={tag[0].acf?.description} tagCloud={siteOptions?.acf.oblako_metok} />
    </>
  );
}

export default CategoryPage;