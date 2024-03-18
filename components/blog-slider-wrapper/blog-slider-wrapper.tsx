
import getPosts from "@/actions/get-posts";

import BlogSlider from "../blog-slider/blog-slider";

import styles from "./blog-slider-wrapper.module.scss";



const BlogSliderWrapper = async () => {
  const posts = await getPosts('?per_page=4&orderby=date&_embed=true');

  return (
    <section className={styles.blog}>
      <div className={styles.blog__top}>
        <h2 className={styles.blog__title}>Блог</h2>
      </div>
      <BlogSlider data={posts} />
    </section>
  );
}

export default BlogSliderWrapper;