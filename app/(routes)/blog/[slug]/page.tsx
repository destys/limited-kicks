import Image from "next/image";

import getPost from "@/actions/get-post";
import getPosts from "@/actions/get-posts";

import BlogSlider from "@/components/blog-slider/blog-slider";
import FlagItem from "@/components/flag-item/flag-item";
import ProductItem from "@/components/product-item/product-item";
import getPostProduct from "@/actions/get-post-product";
import { SchemaMarkup } from "@/components/schema-markup";
import { generateYoastMetadata } from "@/utils/meta-data";
import { notFound } from "next/navigation";
import getPostCategory from "@/actions/get-post-category";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getPost(params.slug);

  if (!data.length) {
    return notFound();
  }

  const yoast_head_json = data[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);
  const category = await getPostCategory(post[0].categories[0]);
  const posts = await getPosts(
    `?per_page=4&orderby=date&_embed=true&categories=${category.id}&exclude=${post[0].id}`
  );
  const product = await getPostProduct({ id: post[0]?.acf?.tovar?.ID ? post[0]?.acf?.tovar?.ID : 0 });

  const pub_date = new Date(post[0].date).toLocaleDateString();

  return (
    <>
      <SchemaMarkup schema={post[0].yoast_head_json.schema} />
      <section>
        <div className="mb-10 relative rounded-lg overflow-hidden">
          <div className="absolute top-5 left-5">
            {category && category.id !== 1 && <FlagItem title={category.name} />}

          </div>
          <Image
            src={post[0]._embedded['wp:featuredmedia'][0].source_url}
            width={1800}
            height={400}
            alt={post[0].title.rendered}
            className="hidden md:block h-[400px] object-cover object-center w-full min-h-[400px]"
          />
          <Image
            src={post[0]._embedded['wp:featuredmedia'][0].source_url}
            width={768}
            height={400}
            alt="Релиз кроссовок Adidas YEEZY в августе 2023"
            className="block md:hidden min-h-[400px] object-cover object-center"
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="mb-5 py-2 px-3 lg:py-3 lg:px-5 w-fit rounded-lg bg-add_1 text-sm lg:text-base">
              {pub_date}
            </div>
            <h1 className="mb-5 uppercase">
              {post[0].title?.rendered}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: post[0].content.rendered }} className="flex flex-col gap-4 text-xs xs:text-sm lg:text-base" />
          </div>
          {post[0].acf.tovar && product && (
            <div className="hidden lg:block">
              <ProductItem data={product} />
            </div>
          )}
        </div>
      </section>
      {posts.length && <BlogSlider data={posts} />}
    </>
  );
}


export default Post;
