import getPage from "@/actions/get-page";
import { removeAdminFromYoast } from "@/utils/build-url";

export default async function Head() {
    const shop = await getPage("shop");
    const cleaned = removeAdminFromYoast(shop[0].yoast_head_json);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(cleaned.schema_graph),
                }}
            />
        </>
    );
}