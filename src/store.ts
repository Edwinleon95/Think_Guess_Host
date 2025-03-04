import { create } from "zustand";

interface GlobalState {
    selectedCategoryId: number | null;
    selectedItemId: number | null;
    playerName: string | null; // Add playerName state
    loading: boolean;
    setSelectedCategoryId: (id: number) => void;
    setSelectedItemId: (id: number) => void;
    setPlayerName: (name: string) => void; // Action to update playerName
    setLoading: (isLoading: boolean) => void; // Action to update loading state
}

export const useGlobalStore = create<GlobalState>((set) => ({
    selectedCategoryId: null,
    selectedItemId: null,
    playerName: null, // Initialize playerName to null
    loading: false,
    setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
    setSelectedItemId: (id) => set({ selectedItemId: id }),
    setPlayerName: (name) => set({ playerName: name }), // Action to set playerName
    setLoading: (isLoading) => set({ loading: isLoading }), // Action to set loading
}));
