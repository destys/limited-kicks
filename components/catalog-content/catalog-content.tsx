import { Attribute, Brand, Category, Product, Tag } from '@/types'

import TopBar from '@/components/top-bar/top-bar';
import BannerCatalog from '@/components/banner-catalog/banner-catalog';

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
    const attributesMap = new Map();

    products.forEach(product => {
        product.attributes.forEach(attribute => {
            if (!attributesMap.has(attribute.id)) {
                attributesMap.set(attribute.id, {
                    id: attribute.id,
                    name: attribute.name,
                    slug: attribute.slug,
                    options: new Set(attribute.options)
                });
            } else {
                const existingAttr = attributesMap.get(attribute.id);
                attribute.options.forEach(option => existingAttr.options.add(option));
            }
        });
    });

    // Преобразуем Map в массив с атрибутами, где опции преобразованы из Set в Array
    const filters: Attribute[] = Array.from(attributesMap.values()).map(attr => ({
        id: attr.id,
        name: attr.name,
        slug: attr.slug,
        options: Array.from(attr.options)
    }));


    return (
        <>
            <section>
                <Crumbs data={category} type="category" />
                <h1 className="mb-10">{title}</h1>
                {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />}
                {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
                <TopBar count={products.length} filters={filters} />
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