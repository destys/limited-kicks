import getAcfOptions from "@/actions/get-acf-options";
import getAttributes from "@/actions/get-attributes";

import CatalogContent from "@/components/catalog-content/catalog-content";
import { generateYoastMetadata } from "@/utils/meta-data";
import getTagsCloud from "@/actions/get-tags-cloud";
import NotFound from "@/app/not-found";
import getCollection from "@/actions/get-collection";

interface IBrandsPage {
  params: {
    collectionSlug: string;
    categorySlug: string;
  },
  searchParams: {}
}

type MetaProps = {
  params: { collectionSlug: string }
}

export async function generateMetadata(
  { params }: MetaProps
) {
  const collection = await getCollection(params.collectionSlug);

  if (!collection.length) {
    return {
      title: '404',
      description: '404',
      image: '',
      url: '',
      type: 'website',
    };
  }

  const yoast_head_json = collection[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const CollectionPage: React.FC<IBrandsPage> = async ({ params, searchParams }) => {
  const siteOptions = await getAcfOptions();
  const collection = await getCollection(params.collectionSlug);

  if (!collection.length) {
    return <NotFound />;
  }

  const collectionAttributes = await getAttributes(10);
  const currentTerm = collectionAttributes.find(term => term.slug === params.collectionSlug);

  const query = {
    attribute: "pa_collections",
    attribute_term: currentTerm?.id,
    per_page: 12,
    page: 1,
  }

  return (
    <CatalogContent
      count={collection[0].count}
      query={query}
      category={collection[0]}
      title={collection[0].name}
      excerpt={collection[0].acf?.korotkoe_opisanie}
      description={collection[0].description}
      tagCloud={siteOptions?.acf?.oblako_metok}
      searchParams={searchParams}
      hiddenBrands={true}
      hiddenVersions={true}
      crumbsType={collection[0].acf.kategoriya ? "brand" : ""}
    />
  );
}

export default CollectionPage; 
