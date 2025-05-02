import getAcfOptions from "@/actions/get-acf-options";
import getPosts from "@/actions/get-posts";
import BlogItem from "@/components/blog-item/blog-item";
import ProductsOnRequest from "@/components/products-on-request/products-on-request";

const Blog = async () => {
  const posts = await getPosts('?per_page=12&orderby=date&_embed=true');
  const siteOptions = await getAcfOptions();

  return (
    <>
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