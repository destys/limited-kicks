import { Product, Tag } from '@/types'

import Crumbs from '../crumbs/crumbs'
import Categories from '@/app/(routes)/category/[categorySlug]/components/categories/categories'
import BrandsCatalog from '@/app/(routes)/category/[categorySlug]/components/brands-catalog/brands-catalog'
import TopBar from '@/app/(routes)/category/[categorySlug]/components/top-bar/top-bar'
import BannerCatalog from '@/app/(routes)/category/[categorySlug]/components/banner-catalog/banner-catalog'
import ProductItem from '../product-item/product-item'
import TagCloud from '../tag-cloud/tag-cloud'

interface ICatalogContent {
    products: Product[];
    title: string;
    excerpt: string;
    description: string;
    tags: Tag[];
}

const CatalogContent: React.FC<ICatalogContent> = ({ products, title, excerpt, description, tags }) => {

    return (
        <>
            <section>
                <Crumbs />
                <h1 className="mb-10">{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />
                <BrandsCatalog />
                <TopBar count={products.length} />
                <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-5">
                    {products?.map((item, index) => (
                        (index + 1 === 9 || index + 1 === 22) ?
                            (<>
                                <div key={index + '-banner'} className="col-span-2 row-span-2">
                                    <BannerCatalog banner={null} />
                                </div>
                                <ProductItem key={item.id} data={item} />
                            </>)
                            : (<ProductItem key={item.id} data={item} />)
                    ))}
                </div>
            </section>
            <TagCloud data={tags} />
            <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-main text-white" />
        </>
    )
}

export default CatalogContent