import { Brand, Category, Product, Tag } from '@/types'

import TopBar from '@/components/top-bar/top-bar';
import BannerCatalog from '@/app/(routes)/shop/components/banner-catalog/banner-catalog';

import Crumbs from '../crumbs/crumbs'
import ProductItem from '../product-item/product-item'
import TagCloud from '../tag-cloud/tag-cloud'

interface ICatalogContent {
    products: Product[];
    title: string;
    excerpt: string;
    description: string;
    tagCloud: Tag[];
    categoryTags?: Tag[];
    category: Category | Brand;
}

const CatalogContent: React.FC<ICatalogContent> = ({ category, products, title, excerpt, description, tagCloud, categoryTags }) => {
    console.log('category: ', category);

    return (
        <>
            <section>
                <Crumbs data={category} type="category" />
                <h1 className="mb-10">{title}</h1>
                {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />}
                {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
                <TopBar count={products.length} />
                <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 lg:gap-x-4 lg:gap-y-5">
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
            <TagCloud data={tagCloud} className="lg:hidden" />
            {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-main text-white" />}
        </>
    )
}

export default CatalogContent