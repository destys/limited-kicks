"use client";
import useMobileFilters from "@/hooks/use-mobile-filters";
import Modal from "./modal";
import FilterItem from "../top-bar/filter-item";

export default function MobileFilters() {
    const { onClose, isOpen, filters } = useMobileFilters();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Modal title={"Фильтры"} isOpen={isOpen} onChange={onChange}>
            <div>
                {filters.map((item: any) => (
                    <FilterItem key={item.id} data={item} />
                ))}
            </div>
        </Modal>
    );
}
