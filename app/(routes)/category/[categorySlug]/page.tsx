import getProducts from "@/actions/get-products";

import BrandsCatalog from "./components/brands-catalog/brands-catalog";
import TopBar from "./components/top-bar/top-bar";
import BannerCatalog from "./components/banner-catalog/banner-catalog";

import Categories from "./components/categories/categories";
import ProductItem from "@/components/product-item/product-item";
import getCategories from "@/actions/get-categories";
import { Product } from "@/types";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  },
  searchParams?: {
    colorId?: string;
    sizeId?: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await getCategories({ slug: params.categorySlug });
  const products = await getProducts({ category: category[0].id });

  return (
    <section>
      <h1 className="mb-10">{category[0].name}</h1>
      <Categories />
      <BrandsCatalog />
      <TopBar count={products.length} />
      <div className="grid lg:grid-cols-4 lg:gap-x-4 lg:gap-y-5">
        {products?.map((item: Product, index: number) => (
          <div
            key={item.id}
            className={
              index + 1 === 9 || index + 1 === 22 ? "col-span-2 row-span-2" : ""
            }
          >
            {index + 1 === 9 && <BannerCatalog />}
            <ProductItem data={item} />
            {index + 1 === 22 && <BannerCatalog />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;