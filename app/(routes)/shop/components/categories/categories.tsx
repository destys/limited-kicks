import getCategories from "@/actions/get-categories";
import CategorySlider from "./category-slider";

export default async function Categories() {
    const categories = await getCategories({
        parent: 0,
        per_page: 10,
    });

    return (
        <div className="mb-10">
            <CategorySlider data={categories} />
        </div>
    );
}
