import { Page } from "@/types";
import FaqItem from "./faq-item";
import Crumbs from "@/components/crumbs/crumbs";
import { SchemaMarkup } from "@/components/schema-markup";

interface IFaq {
    data: Page;
}

const Faq: React.FC<IFaq> = ({ data }) => {
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.acf.faq.map((item) => ({
            "@type": "Question",
            "name": item.vopros,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.otvet
            }
        }))
    };

    return (
        <section className="bg-white">
            <SchemaMarkup schema={faqStructuredData} />
            <Crumbs data={data} type="faq" />
            <h1 className="mb-10">{data.title.rendered}</h1>

            {data.acf.faq.map((item, index) => (
                <FaqItem key={item.vopros} data={item} index={index} />
            ))}
        </section>
    );
};

export default Faq;