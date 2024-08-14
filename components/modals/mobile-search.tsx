"use client";
import useMobileSearch from "@/hooks/use-mobile-search";
import Modal from "./modal";
import Search from "../search/search";

export default function MobileSearch() {
    const { onClose, isOpen } = useMobileSearch();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Modal title={"Что ищем?"} isOpen={isOpen} onChange={onChange}>
            <Search />
        </Modal>
    );
}
