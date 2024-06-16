import { Attribute, Brand, Category, Product, Tag } from '@/types';
import Crumbs from '@/components/crumbs/crumbs';
import TopBar from '@/components/top-bar/top-bar';
import TagCloud from '@/components/tag-cloud/tag-cloud';
import ProductsGrid from '@/components/products-grid/products-grid';

interface ICatalogContent {
  initialProducts: Product[];
  title: string;
  excerpt: string;
  description: string;
  tagCloud: Tag[];
  categoryTags?: Tag[];
  category: Category | Brand;
  searchParams: {};
}

const CatalogContent: React.FC<ICatalogContent> = ({ category, initialProducts, title, excerpt, description, tagCloud, categoryTags, searchParams }) => {
  const attributesMap = new Map();

  initialProducts.forEach(product => {
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
        <TopBar count={initialProducts.length} filters={filters} />
        <ProductsGrid initialProducts={initialProducts} searchParams={searchParams} />
      </section>
      <TagCloud data={tagCloud} className="lg:hidden" />
      {description && <div dangerouslySetInnerHTML={{ __html: description }} className="grid gap-3 py-10 px-2 lg:px-[60px] bg-main text-white" />}
    </>
  );
};

export default CatalogContent;
