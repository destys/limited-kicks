import { Product, SingleImage } from "@/types";
import { create } from "zustand";

interface useOneClickModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

export const useCallbackModal = create<useOneClickModalProps>((set) => ({
  isOpen: false,
  product: undefined,
  sizeValue: '',
  entrySize: {},
  image: null,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));
