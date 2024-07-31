import { SingleImage } from "@/types";
import { create } from "zustand";

interface useProductGalleryModalProps {
    isOpen: boolean;
    images: SingleImage[];
    onOpen: (images: SingleImage[]) => void;
    onClose: () => void
}

const useProductGalleryModal = create<useProductGalleryModalProps>((set) => ({
    isOpen: false,
    images: [],
    onOpen: (images) =>
        set({
            isOpen: true,
            images: images,
        }),
    onClose: () =>
        set({
            isOpen: false,
            images: [],
        }),
}));

export default useProductGalleryModal;
