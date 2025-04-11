import getAcfOptions from "@/actions/get-acf-options";
import getAttributes from "@/actions/get-attributes";

import CatalogContent from "@/components/catalog-content/catalog-content";
import getBrand from "@/actions/get-brand";
import { generateYoastMetadata } from "@/utils/meta-data";
import getTagsCloud from "@/actions/get-tags-cloud";
import NotFound from "@/app/not-found";
import getPage from "@/actions/get-page";

interface IBrandsPage {
    params: {
        pageSlug: string;
    },
    searchParams: {}
}

export async function generateMetadata() {
    const page = await getPage('nalichie');
    if (!page.length) {
        return
    }
    const yoast_head_json = page[0].yoast_head_json;

    return generateYoastMetadata(yoast_head_json);
}

const InstockPage: React.FC<IBrandsPage> = async ({ searchParams }) => {
    const siteOptions = await getAcfOptions();
    const brand = await getBrand('nike');
    const page = await getPage('nalichie');

    if (!brand.length) {
        return <NotFound />;
    }

    const brandAttributes = await getAttributes(9);
    const currentTerm = brandAttributes.find(term => term.slug === 'nike');

    const query = {
        attribute: "pa_collections",
        attribute_term: 1783,
        per_page: 12,
        page: 1,
    }

    const tagsCloud = await getTagsCloud('pa_brand', currentTerm?.id);

    return (
        <CatalogContent
            count={87}
            query={query}
            category={page[0]}
            crumbsType={'page'}
            title={page[0].title.rendered}
            excerpt={page[0].acf?.korotkoe_opisanie}
            description={page[0].content.rendered}
            tagCloud={siteOptions?.acf?.oblako_metok}
            categoryTags={tagsCloud}
            searchParams={searchParams}
            hiddenBrands={true}
        />
    );
}

export default InstockPage; 
