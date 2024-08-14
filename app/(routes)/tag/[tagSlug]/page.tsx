import getAcfOptions from "@/actions/get-acf-options";
import CatalogContent from "@/components/catalog-content/catalog-content";
import getTags from "@/actions/get-tags";
import NotFound from "@/app/not-found";
import { generateYoastMetadata } from "@/utils/meta-data";

interface ITagPage {
  params: {
    tagSlug: string;
    categorySlug: string;
  },
  searchParams: {}
}

type MetaProps = {
  params: { tagSlug: string }
}

export async function generateMetadata(
  { params }: MetaProps
) {
  const tag = await getTags({ slug: params.tagSlug });
  if (!tag.length) {
    return {
      title: '404',
      description: '404',
      image: '',
      url: '',
      type: 'website',
    };
  }
  const yoast_head_json = tag[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const TagPage: React.FC<ITagPage> = async ({ params, searchParams }) => {
  const tag = await getTags({ slug: params.tagSlug });

  if (!tag.length) {
    return <NotFound />
  }

  const siteOptions = await getAcfOptions();

  const query = {
    tag: tag[0].id,
    per_page: 12,
    page: 1,
    ...searchParams
  }

  return (
    <CatalogContent
      count={tag[0].count}
      query={query}
      category={tag[0]}
      title={tag[0].name}
      excerpt={tag[0].acf?.korotkoe_opisanie}
      description={tag[0].description}
      tagCloud={siteOptions?.acf?.oblako_metok}
      categoryTags={tag[0].acf?.metki_pod_zagolovkom}
      searchParams={searchParams}
    />
  );
}

export default TagPage;
