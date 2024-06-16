import getProducts from "@/actions/get-products";
import { ResolvingMetadata } from "next";
import getAcfOptions from "@/actions/get-acf-options";
import CatalogContent from "@/components/catalog-content/catalog-content";
import getTags from "@/actions/get-tags";
import NotFound from "@/app/not-found";

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
  { params }: MetaProps,
  parent: ResolvingMetadata
) {
  const tag = await getTags({ slug: params.tagSlug });
  if (!tag.length) {
    return {};
  }
  const yoast_head_json = tag[0].yoast_head_json;

  return {
    title: yoast_head_json.title,
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

const TagPage: React.FC<ITagPage> = async ({ params, searchParams }) => {
  const tag = await getTags({ slug: params.tagSlug });

  if (!tag.length) {
    return <NotFound />
  }

  const siteOptions = await getAcfOptions();
  const initialProducts = await getProducts({
    tag: tag[0].id,
    per_page: 24,
    page: 1,
    ...searchParams
  });

  return (
    <CatalogContent
      category={tag[0]}
      initialProducts={initialProducts}
      title={tag[0].name}
      excerpt={tag[0].acf?.korotkoe_opisanie}
      description={tag[0].acf?.description}
      tagCloud={siteOptions?.acf.oblako_metok}
      searchParams={searchParams}
    />
  );
}

export default TagPage;
