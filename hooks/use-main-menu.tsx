import { create } from "zustand";

interface useMainMenu {
    isOpen: boolean;
    onOpen: (filters: any) => void;
    onClose: () => void;
}

const useMainMenu = create<useMainMenu>((set) => ({
    isOpen: false,
    onOpen: () => {
        document.body.classList.add('locked');
        set({ isOpen: true });
    },
    onClose: () => {
        document.body.classList.remove('locked');
        set({ isOpen: false });
    },
}));

export default useMainMenu;
