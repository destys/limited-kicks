import { create } from "zustand";

interface useMobileFiltersProps {
  isOpen: boolean;
  onOpen: (filters: any) => void;
  onClose: () => void;
  filters: [];
}

const useMobileFilters = create<useMobileFiltersProps>((set) => ({
  isOpen: false,
  filters: [],
  onOpen: (filters: any) =>
    set({
      isOpen: true,
      filters: filters,
    }),
  onClose: () =>
    set({
      isOpen: false,
      filters: [],
    }),
}));

export default useMobileFilters;
