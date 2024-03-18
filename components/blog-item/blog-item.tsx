import Image from "next/image";
import Link from "next/link";

import { BlogItem } from "@/types";

import styles from "./blog-item.module.scss";

interface IBlogItem {
    data: BlogItem[];
}

const BlogItem: React.FC<BlogItem> = ({ data }) => {
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
                <p className="max-md:text-xs">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
                    alias eaque soluta ducimus vero animi qui fugiat ea, totam, repellat
                    et, dolorem corrupti dolor neque expedita? Nobis dolorem iste omnis!
                </p>
            </Link>
        </article>
    );
}

export default BlogItem;
