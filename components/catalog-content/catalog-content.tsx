import { Attribute, Brand, Category, IProductsQuery, Tag } from '@/types';
import Crumbs from '@/components/crumbs/crumbs';
import TopBar from '@/components/top-bar/top-bar';
import TagCloud from '@/components/tag-cloud/tag-cloud';
import ProductsGrid from '@/components/products-grid/products-grid';
import BrandsCatalog from '@/app/(routes)/shop/components/brands-catalog/brands-catalog';
import getAcfOptions from '@/actions/get-acf-options';

interface ICatalogContent {
  count: number;
  title: string;
  excerpt: string;
  description: string;
  tagCloud: Tag[];
  categoryTags?: Tag[];
  category: Category | Brand;
  searchParams: {};
  query: IProductsQuery,
  hiddenBrands?: boolean,
  filtersList?: { attributes: Attribute[] };
}

const CatalogContent: React.FC<ICatalogContent> = async ({ count, category, query, title, excerpt, description, tagCloud, categoryTags, searchParams, hiddenBrands, filtersList }) => {
  const siteOptions = await getAcfOptions();

  const brandAttribute = filtersList?.attributes.find(
    (attribute: { name: string; }) => attribute.name === 'Бренд'
  )

  return (
    <>
      <section>
        <Crumbs data={category} type="category" />
        <h1 className="mb-10">{title}</h1>
        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />}
        {!hiddenBrands && brandAttribute && <BrandsCatalog brandsArray={brandAttribute} />}
        {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
        <TopBar count={count} query={query} />
        <ProductsGrid query={query} searchParams={searchParams} banners={siteOptions?.acf?.bannery_v_kataloge} />
      </section>
      {tagCloud && <TagCloud data={tagCloud} className="lg:hidden" />}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-main text-white" />}
    </>
  );
};

export default CatalogContent;
