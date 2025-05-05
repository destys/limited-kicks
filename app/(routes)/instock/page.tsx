import getAcfOptions from "@/actions/get-acf-options";

import CatalogContent from "@/components/catalog-content/catalog-content";
import getBrand from "@/actions/get-brand";
import { generateYoastMetadata } from "@/utils/meta-data";
import NotFound from "@/app/not-found";
import getPage from "@/actions/get-page";

interface IBrandsPage {
    params: {
        pageSlug: string;
    },
    searchParams: {}
}

export async function generateMetadata() {
    const page = await getPage('v-nalichii');
    if (!page.length) {
        return
    }
    const yoast_head_json = page[0].yoast_head_json;

    return generateYoastMetadata(yoast_head_json);
}

const InstockPage: React.FC<IBrandsPage> = async ({ searchParams }) => {
    const siteOptions = await getAcfOptions();
    const page = await getPage('v-nalichii');

    const query = {
        attribute: "pa_collections",
        attribute_term: 1783,
        per_page: 12, 
        page: 1,
    }

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
            categoryTags={undefined}
            searchParams={searchParams}
            hiddenBrands={true}
            hiddenVersions={true}
        />
    );
}

export default InstockPage; 
