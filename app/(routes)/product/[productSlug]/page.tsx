import NotFound from "@/app/not-found";

import Banner from "@/components/banner/banner";
import Listing from "@/components/listing/listing";
import Price from "@/components/price/price";
import Ticker from "@/components/ticker/ticker";
import ProductGallery from "./components/product-gallery/product-gallery";
import ProductInfoVariable from "./components/product-info/product-info-variable";
import ProductInfoSimple from "./components/product-info/product-info-simple";

import getAcfOptions from "@/actions/get-acf-options";
import getProducts from "@/actions/get-products";

import styles from './product.module.scss';
import TagCloud from "@/components/tag-cloud/tag-cloud";
import Crumbs from "@/components/crumbs/crumbs";
import getProduct from "@/actions/get-product";

interface ProductPageProps {
    params: {
        productSlug: string;
    },
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const data = await getProduct({ slug: params.productSlug });
    const siteOptions = await getAcfOptions();
    const listing_1 = await getProducts({ include: [siteOptions?.acf?.listing_1?.products] });

    if (!data) {
        return <NotFound />;
    }

    return (
        <>
            <section>
                <Crumbs type={"product"} data={data} />
                <div className={styles.product}>
                    <div className={styles.gallery}>
                        <ProductGallery productId={data.id} data={data.images} flag={data.acf.flag_1} flag_2={data.acf.flag_2} />
                    </div>
                    <div className={styles.info}>
                        <h1 className="mb-2 sm:mb-3 lg:mb-4">{data.name}</h1>
                        <Price
                            value={data.price}
                            className="mb-5 sm:mb-7 lg:mb-10 text-xs xs:text-sm sm:text-base lg:text-lg"
                        />
                        {data.type === 'variable' ? <ProductInfoVariable data={data} /> : <ProductInfoSimple data={data} />}

                    </div>
                </div>
            </section>
            <Ticker />
            <Listing data={listing_1} title={siteOptions?.acf?.listing_1?.title} titleTag="h2" />
            <Banner data={siteOptions?.acf?.bannery} />
            <TagCloud data={siteOptions?.acf?.oblako_metok} />
        </>
    );
}

export default ProductPage

