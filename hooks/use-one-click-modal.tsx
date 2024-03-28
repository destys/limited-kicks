import { Product } from "@/types";
import { create } from "zustand";

interface useOneClickModalProps {
  isOpen: boolean;
  product?: Product;
  sizeType: string;
  entrySize: { [key: string]: any; };
  onOpen: (productData: Product, size: string, entrySize: { [key: string]: any; }) => void;
  onClose: () => void
}

const useOneClickModal = create<useOneClickModalProps>((set) => ({
  isOpen: false,
  product: undefined,
  sizeType: '',
  entrySize: {},
  onOpen: (productData, sizeType, entrySize) =>
    set({
      isOpen: true,
      product: productData,
      sizeType: sizeType,
      entrySize: entrySize,
    }),
  onClose: () =>
    set({
      isOpen: false,
      product: undefined,
      sizeType: '',
      entrySize: {},
    }),
}));

export default useOneClickModal;
