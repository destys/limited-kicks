import getPage from "@/actions/get-page";
import getPosts from "@/actions/get-posts";
import BlogItem from "@/components/blog-item/blog-item";
import { SchemaMarkup } from "@/components/schema-markup";
import { generateYoastMetadata } from "@/utils/meta-data";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const data = await getPage('blog');

  if (!data) {
    return notFound();
  }

  const yoast_head_json = data[0].yoast_head_json;

  return generateYoastMetadata(yoast_head_json);
}

const Blog = async () => {
  const posts = await getPosts('?per_page=12&orderby=date&_embed=true');
  const data = await getPage('blog');

  return (
    <>
      <SchemaMarkup schema={data[0].yoast_head_json.schema} />
      <section>
        <h1 className="mb-5 lg:mb-11">Блог</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-5">
          {posts.map((item) => (
            <BlogItem key={item.id} data={item} />
          ))}
        </div>
      </section>
      {/* <ProductsOnRequest data={siteOptions?.acf.tovary_po_zaprosu} /> */}
    </>
  );
}

export default Blog;