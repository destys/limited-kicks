import { Product, SingleImage } from "@/types";
import { create } from "zustand";

interface useToOrderModalProps {
  isOpen: boolean;
  product?: Product;
  sizeValue: string;
  entrySize: { [key: string]: any; };
  image: SingleImage | null;
  onOpen: (productData: Product, size: string, entrySize: { [key: string]: any; }, image: SingleImage) => void;
  onClose: () => void
}

const useToOrderModal = create<useToOrderModalProps>((set) => ({
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

export default useToOrderModal;
