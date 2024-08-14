import { create } from "zustand";

interface useProductsOnRequestModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

const useProductsOnRequestModal = create<useProductsOnRequestModalProps>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));

export default useProductsOnRequestModal;
