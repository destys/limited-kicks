import { Brand, Category, Product, Tag } from '@/types'

import Crumbs from '../crumbs/crumbs';
import TagCloud from '../tag-cloud/tag-cloud';
import ProductsList from '../products-list/products-list';

interface ICatalogContent {
    title: string;
    excerpt: string;
    description: string;
    tagCloud: Tag[];
    categoryTags?: Tag[];
    category: Category | Brand;
    searchParams: any;
}

const CatalogContent: React.FC<ICatalogContent> = ({ searchParams, category, title, excerpt, description, tagCloud, categoryTags }) => {


    return (
        <>
            <section>
                <Crumbs data={category} type="category" />
                <h1 className="mb-10">{title}</h1>
                {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />}
                {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
                <ProductsList searchParams={searchParams} categoryId={category.id} />
            </section>
            <TagCloud data={tagCloud} className="lg:hidden" />
            {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-main text-white" />}
        </>
    )
}

export default CatalogContent