import Image from "next/image";
import Link from "next/link";

import { Post } from "@/types";

import styles from "./blog-item.module.scss";

interface BlogItemProps {
    data: Post;
}

const BlogItem: React.FC<BlogItemProps> = ({ data }) => {
    return (
        <article>
            <Link href={`/blog/${data.slug}`}>
                <div className="mb-3 md:mb-5 rounded-[10px] overflow-hidden">
                    <Image
                        src={data._embedded['wp:featuredmedia'][0].source_url}
                        width={589}
                        height={300}
                        alt={data.title.rendered}
                    />
                </div>
                <h3 className="mb-2 max-md:text-base">{data.title.rendered}</h3>
                <div dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }} className="max-md:text-xs line-clamp-5"/>
            </Link>
        </article>
    );
}

export default BlogItem;
