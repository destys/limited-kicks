import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";

import BrandsCatalog from "./components/brands-catalog/brands-catalog";
import TopBar from "./components/top-bar/top-bar";
import Categories from "./components/categories/categories";
import BannerCatalog from "./components/banner-catalog/banner-catalog";

import ProductItem from "@/components/product-item/product-item";
import { ResolvingMetadata } from "next";
import Crumbs from "@/components/crumbs/crumbs";
import TagCloud from "@/components/tag-cloud/tag-cloud";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  },
  searchParams?: {
    colorId?: string;
    sizeId?: string;
  }
}

type MetaProps = {
  params: { categorySlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
) {
  const category = await getCategories({ slug: params.categorySlug });
  const yoast_head_json = category[0].yoast_head_json;

  return {
    title: yoast_head_json.title, // Если у продукта есть свое собственное название, используйте его, в противном случае используйте название из yoast_head_json
    description: yoast_head_json.description,
    canonical: yoast_head_json.canonical,
    openGraph: {
      type: yoast_head_json.og_type,
      locale: yoast_head_json.og_locale,
      url: yoast_head_json.og_url,
      title: yoast_head_json.og_title,
      description: yoast_head_json.og_description,
      site_name: yoast_head_json.og_site_name,
    },
    twitter: {
      cardType: yoast_head_json.twitter_card,
    },
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await getCategories({ slug: params.categorySlug });
  const products = await getProducts({ category: category[0].id });

  return (
    <>
      <section>
        <Crumbs />
        <h1 className="mb-10">{category[0].name}</h1>
        <Categories />
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
      <TagCloud />
    </>
  );
}

export default CategoryPage;