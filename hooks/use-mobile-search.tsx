import { create } from "zustand";

interface useMobileSearchProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

const useMobileSearch = create<useMobileSearchProps>((set) => ({
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

export default useMobileSearch;
