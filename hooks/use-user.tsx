"use client";
import { create } from "zustand";

interface UserState {
    jwtToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const useUser = create<UserState>((set) => ({
    jwtToken:
        typeof localStorage !== "undefined"
            ? localStorage.getItem("jwtToken")
            : null,
    login: (token: string) => {
        set({ jwtToken: token });
        localStorage.setItem("jwtToken", token);
    },
    logout: () => {
        set({ jwtToken: null });
        localStorage.removeItem("jwtToken");
    },
}));

export default useUser;