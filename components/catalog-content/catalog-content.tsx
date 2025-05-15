import { Attribute, Brand, Category, IProductsQuery, Page, Tag } from '@/types';
import Crumbs from '@/components/crumbs/crumbs';
import TopBar from '@/components/top-bar/top-bar';
import TagCloud from '@/components/tag-cloud/tag-cloud';
import ProductsGrid from '@/components/products-grid/products-grid';
import BrandsCatalog from '@/app/(routes)/shop/components/brands-catalog/brands-catalog';
import getAcfOptions from '@/actions/get-acf-options';
import { versions } from 'process';
import Versions from '../versions/versions';
import CrumbsMobile from '../crumbs/crumbs-mobile';
import { SchemaMarkup } from '../schema-markup';
import getProducts from '@/actions/get-products';
import { Suspense } from 'react';

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
  hiddenVersions?: boolean,
  filtersList?: { attributes: Attribute[] };
  crumbsType?: string;
}

const CatalogContent: React.FC<ICatalogContent> = async ({ count, category, query, title, excerpt, description, tagCloud, categoryTags, searchParams, hiddenBrands, filtersList, crumbsType, hiddenVersions = false }) => {
  const siteOptions = await getAcfOptions();

  const attributes =
    typeof filtersList === 'object' &&
      !Array.isArray(filtersList) &&
      Array.isArray(filtersList.attributes)
      ? filtersList.attributes
      : [];

  const brandAttribute = attributes.find(attr => attr.name === 'Бренд');
  const versions = attributes.find(attr => attr.name === 'Версия');

  const initialProducts = await getProducts({
    ...query,
    ...searchParams,
    per_page: 12,
    page: 1,
  });

  return (
    <>
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": (() => {
            switch (crumbsType) {
              case "brand":
                return "Brand";
              case "model":
                return "ProductGroup";
              case "collection":
              case "category":
              default:
                return "CollectionPage";
            }
          })(),
          "name": title,
          "description": excerpt || description || "",
          ...(crumbsType === "brand"
            ? {
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": `${title} — каталог`,
                "itemListElement": initialProducts.map((product, index) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": product.name || "",
                    "url": `https://limited-kicks.ru/product/${product.slug}`
                  }
                }))
              }
            }
            : crumbsType === "model"
              ? {
                "hasVariant": initialProducts.map((product) => ({
                  "@type": "Product",
                  "name":product.name || "",
                  "url": `https://limited-kicks.ru/product/${product.slug}`
                }))
              }
              : {
                "mainEntity": {
                  "@type": "ItemList",
                  "itemListElement": initialProducts.map((product, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `https://limited-kicks.ru/product/${product.slug}`,
                    "name": product.name || ""
                  }))
                }
              })
        }}
      />

      <section>
        <Crumbs data={category} type={crumbsType || "category"} />
        <CrumbsMobile data={category} type={crumbsType || "category"} className="mt-5" />
        <h1 className="mb-7 md:mb-10">{title}</h1>
        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="max-md:text-sm mb-10" />}
        {!hiddenBrands && brandAttribute && <BrandsCatalog brandsArray={brandAttribute} />}
        {categoryTags && <TagCloud data={categoryTags} wrapper="div" className="mb-10" />}
        {versions && !hiddenVersions && <Versions versionsArray={versions} />}
        <TopBar count={count} query={query} searchParams={searchParams} />
        <Suspense fallback={null}>
          <ProductsGrid query={query} searchParams={searchParams} banners={siteOptions?.acf?.bannery_v_kataloge} initialProducts={initialProducts} />
        </Suspense>
      </section>
      {tagCloud && <TagCloud data={tagCloud} className="lg:hidden" />}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 text-sm md:text-base lg:px-[60px] bg-add_1 text-black" />}
    </>
  );
};

export default CatalogContent;
