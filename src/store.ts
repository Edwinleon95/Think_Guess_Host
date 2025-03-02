import { create } from "zustand";

interface GlobalState {
    selectedCategoryId: number | null;
    selectedItemId: number | null;
    setSelectedCategoryId: (id: number) => void;
    setSelectedItemId: (id: number) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    selectedCategoryId: null,
    selectedItemId: null,
    setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
    setSelectedItemId: (id) => set({ selectedItemId: id }),
}));
