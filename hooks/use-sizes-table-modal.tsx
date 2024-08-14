import { iSizesTable } from "@/types";
import { create } from "zustand";

interface useProductGalleryModalProps {
    isOpen: boolean;
    sizes: iSizesTable | null;
    onOpen: (sizes: iSizesTable) => void;
    onClose: () => void
}

const useTableSizesModal = create<useProductGalleryModalProps>((set) => ({
    isOpen: false,
    sizes: null,
    onOpen: (sizes) =>
        set({
            isOpen: true,
            sizes: sizes,
        }),
    onClose: () =>
        set({
            isOpen: false,
            sizes: null,
        }),
}));

export default useTableSizesModal;
