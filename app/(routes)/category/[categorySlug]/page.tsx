import { ResolvingMetadata } from "next";
import { generateYoastMetadata } from "@/utils/meta-data";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import getAcfOptions from "@/actions/get-acf-options";
import CatalogContent from "@/components/catalog-content/catalog-content";

interface ICategoryPage {
  params: {
    categorySlug: string;
  },
  searchParams: {}
}

type MetaProps = {
  params: { categorySlug: string }
}

export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata
) {
  const category = await getCategories({ slug: params.categorySlug });
  const yoast_head_json = category[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const CategoryPage: React.FC<ICategoryPage> = async ({ params, searchParams }) => {
  const siteOptions = await getAcfOptions();
  const category = await getCategories({ slug: params.categorySlug });

  const initialProducts = await getProducts({
    category: category[0].id,
    per_page: 24,
    page: 1,
    ...searchParams
  });

  return (
    <CatalogContent
      initialProducts={initialProducts}
      category={category[0]}
      title={category[0].name}
      excerpt={category[0].acf?.korotkoe_opisanie}
      description={category[0].description}
      tagCloud={siteOptions?.acf?.oblako_metok}
      categoryTags={category[0].acf?.metki_pod_zagolovkom}
      searchParams={searchParams}
    />
  );
};

export default CategoryPage;
