import getPage from "@/actions/get-page";
import getAcfOptions from "@/actions/get-acf-options";
import NotFound from "@/app/not-found";
import Crumbs from "@/components/crumbs/crumbs";
import Faq from "@/components/pages/faq/faq";
import { generateYoastMetadata } from "@/utils/meta-data";

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

  return generateYoastMetadata(yoast_head_json);
}

export default async function HomePage({ params }: Params) {
  const pageData = await getPage(params.pageSlug);

  if (!pageData.length) {
    return <NotFound />
  }

  const templateName = pageData[0].template;


  const siteOptions = await getAcfOptions();

  if (templateName === 'page-faq.php') {
    return <Faq data={pageData[0]} />
  }

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

