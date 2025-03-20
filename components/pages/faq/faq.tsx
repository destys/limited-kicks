import { Page } from "@/types"
import FaqItem from "./faq-item";
import Crumbs from "@/components/crumbs/crumbs";


interface IFaq {
    data: Page;
}
const Faq: React.FC<IFaq> = ({ data }) => {
    return (
        <section className="bg-white">
            <Crumbs data={data} />
            <h1 className="mb-10">{data.title.rendered}</h1>

            {data.acf.faq.map((item, index) => (
                <FaqItem key={item.vopros} data={item} index={index} />
            ))}
        </section>
    )
}

export default Faq