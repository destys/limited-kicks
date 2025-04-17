import { Attribute, Brand, Category, IProductsQuery, Page, Tag } from '@/types';
import Crumbs from '@/components/crumbs/crumbs';
import TopBar from '@/components/top-bar/top-bar';
import TagCloud from '@/components/tag-cloud/tag-cloud';
import ProductsGrid from '@/components/products-grid/products-grid';
import BrandsCatalog from '@/app/(routes)/shop/components/brands-catalog/brands-catalog';
import getAcfOptions from '@/actions/get-acf-options';
import { versions } from 'process';
import Versions from '../versions/versions';

interface ICatalogContent {
  count: number;
  title: string;
  excerpt: string;
  description: string;
  tagCloud: Tag[];
  categoryTags?: Tag[];
  category: Category | Brand | Page;
  searchParams: {};
  query: IProductsQuery,
  hiddenBrands?: boolean,
  filtersList?: { attributes: Attribute[] };
  crumbsType?: string;
}

const CatalogContent: React.FC<ICatalogContent> = async ({ count, category, query, title, excerpt, description, tagCloud, categoryTags, searchParams, hiddenBrands, filtersList, crumbsType }) => {
  const siteOptions = await getAcfOptions();

  const attributes =
    typeof filtersList === 'object' &&
      !Array.isArray(filtersList) &&
      Array.isArray(filtersList.attributes)
      ? filtersList.attributes
      : [];

  const brandAttribute = attributes.find(attr => attr.name === 'Бренд');
  const versions = attributes.find(attr => attr.name === 'Версия');

  return (
    <>
      <section>
        <Crumbs data={category} type={crumbsType || "category"} />
        <h1 className="mb-10">{title}</h1>
        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="mb-10" />}
        {!hiddenBrands && brandAttribute && <BrandsCatalog brandsArray={brandAttribute} />}
        {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
        {versions && <Versions versionsArray={versions} />}
        <TopBar count={count} query={query} />
        <ProductsGrid query={query} searchParams={searchParams} banners={siteOptions?.acf?.bannery_v_kataloge} />
      </section>
      {tagCloud && <TagCloud data={tagCloud} className="lg:hidden" />}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-add_1 text-black" />}
    </>
  );
};

export default CatalogContent;
