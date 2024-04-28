import getPage from "@/actions/get-page";
import getAcfOptions from "@/actions/get-acf-options";
import NotFound from "@/app/not-found";
import Crumbs from "@/components/crumbs/crumbs";

type Params = {
  params: {
    pageSlug: string;
  }
}

export async function generateMetadata({ params }: Params) {
  const page = await getPage(params.pageSlug);
  if (!page.length) {
    return
  }
  const yoast_head_json = page[0].yoast_head_json;

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

export default async function HomePage({ params }: Params) {
  const pageData = await getPage(params.pageSlug);
  if (!pageData.length) {
    return <NotFound />
  }
  const siteOptions = await getAcfOptions();

  return (
    <>
      <section>
        <Crumbs data={pageData[0]} />
        <h1 className="mb-10">{pageData[0].title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData[0].content.rendered }} className="grid gap-4 text-xs xs:text-sm lg:text-base" />
      </section>
    </>
  );
}

