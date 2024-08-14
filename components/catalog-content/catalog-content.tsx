import { Attribute, Brand, Category, IProductsQuery, Product, Tag } from '@/types';
import Crumbs from '@/components/crumbs/crumbs';
import TopBar from '@/components/top-bar/top-bar';
import TagCloud from '@/components/tag-cloud/tag-cloud';
import ProductsGrid from '@/components/products-grid/products-grid';
import BrandsCatalog from '@/app/(routes)/shop/components/brands-catalog/brands-catalog';

interface ICatalogContent {
  count: number;
  title: string;
  excerpt: string;
  description: string;
  tagCloud: Tag[];
  categoryTags?: Tag[];
  category: Category | Brand;
  searchParams: {};
  query: IProductsQuery
}

const CatalogContent: React.FC<ICatalogContent> = ({ count, category, query, title, excerpt, description, tagCloud, categoryTags, searchParams }) => {

  return (
    <>
      <section>
        <Crumbs data={category} type="category" />
        <h1 className="mb-10">{title}</h1>
        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />}
        <BrandsCatalog />
        {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
        <TopBar count={count} query={query} />
        <ProductsGrid query={query} searchParams={searchParams} />
      </section>
      {tagCloud && <TagCloud data={tagCloud} className="lg:hidden" />}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-main text-white" />}
    </>
  );
};

export default CatalogContent;
