import NotFound from "@/app/not-found";

import getAcfOptions from "@/actions/get-acf-options";
import getProduct from "@/actions/get-product";

import Banner from "@/components/banner/banner";
import Listing from "@/components/listing/listing";
import Ticker from "@/components/ticker/ticker";
import ProductGallery from "./components/product-gallery/product-gallery";
import ProductInfoVariable from "./components/product-info/product-info-variable";
import ProductInfoSimple from "./components/product-info/product-info-simple";
import AddToRecently from "./components/add-to-recently/add-to-recently";
import Crumbs from "@/components/crumbs/crumbs";
import TagCloud from "@/components/tag-cloud/tag-cloud";
import { generateYoastMetadata } from "@/utils/meta-data";
import getProductsListing from "@/actions/get-products-listing";
import getProducts from "@/actions/get-products";

import styles from './product.module.scss';
import RecentViewedListing from "@/components/recent-viewed-listing/recent-viewed-listing";
import getTagsCloud from "@/actions/get-tags-cloud";
import getAttributes from "@/actions/get-attributes";

interface ProductPageProps {
    params: {
        productSlug: string;
    },
}

export async function generateMetadata({ params }: ProductPageProps) {
    const data = await getProduct({ slug: params.productSlug });

    if (!data) {
        return <NotFound />
    }

    const yoast_head_json = data.yoast_head_json;

    return generateYoastMetadata(yoast_head_json);
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const data = await getProduct({ slug: params.productSlug });
    const siteOptions = await getAcfOptions();
    const listing_1 = await getProductsListing({ include: [siteOptions?.acf?.listing_1?.products] });

    const brandAttributes = await getAttributes(9);
    const currentTerm = brandAttributes.find(term => term.slug === data?.brand[0]?.slug) || null;
    const tagsCloud = await getTagsCloud('pa_brand', currentTerm?.id);


    if (!data) {
        return <NotFound />;
    }


    const likes = await getProducts({
        tag: data.tags[0].id,
        per_page: 12,
    });

    return (
        <>
            <section>
                <AddToRecently id={data.id} />
                <Crumbs type={"product"} data={data} />
                <div className={styles.product}>
                    <div className={styles.gallery}>
                        <ProductGallery productId={data.id} data={data} />
                    </div>
                    <div className={styles.info}>
                        <h1 className="mb-2 sm:mb-3 lg:mb-4">{data.name}</h1>
                        

                        {data.type === 'variable' ? <ProductInfoVariable data={data} /> : <ProductInfoSimple data={data} />}
                    </div>
                </div>
            </section>
            <Ticker />
            <Listing data={likes} title={"Вам может понравиться"} titleTag="h2" />
            <Banner data={siteOptions?.acf?.bannery} />
            <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h2" />
            <RecentViewedListing />
            <TagCloud data={tagsCloud} />
        </>
    );
}

export default ProductPage

