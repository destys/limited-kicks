import { Product, SingleImage } from "@/types";
import { create } from "zustand";

interface useOneClickModalProps {
  isOpen: boolean;
  product?: Product;
  sizeValue: string;
  entrySize: { [key: string]: any; };
  image: SingleImage | null;
  onOpen: (productData: Product, size: string, entrySize: { [key: string]: any; }, image: SingleImage) => void;
  onClose: () => void
}

const useOneClickModal = create<useOneClickModalProps>((set) => ({
  isOpen: false,
  product: undefined,
  sizeValue: '',
  entrySize: {},
  image: null,
  onOpen: (productData, sizeValue, entrySize, image) =>
    set({
      isOpen: true,
      product: productData,
      sizeValue: sizeValue,
      entrySize: entrySize,
      image: image,
    }),
  onClose: () =>
    set({
      isOpen: false,
      product: undefined,
      sizeValue: '',
      entrySize: {},
      image: null,
    }),
}));

export default useOneClickModal;
