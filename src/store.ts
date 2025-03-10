import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Player {
    id: string;
    name: string;
    roomId: string;
}

interface GlobalState {
    selectedCategoryId: number | null;
    loading: boolean;
    selectedItemId: number | null;


    roomId: number | null;
    playerName: string | null;
    playersJoined: Player[];
    currentPlayer: Player;

    
    setSelectedCategoryId: (id: number) => void;
    setSelectedItemId: (id: number) => void;
    setLoading: (isLoading: boolean) => void;


    setRoomId: (id: number) => void;
    setPlayerName: (name: string) => void;
    setPlayersJoined: (players: Player[]) => void;
    setCurrentPlayer: (currentPlayer: Player) => void;
    addPlayer: (player: Player) => void;
    removePlayer: (playerId: string) => void;
    resetPlayersJoined: () => void;

    // Add clearState action
    clearState: () => void;
}

// Define initial state for resetting
const initialState: GlobalState = {
    selectedCategoryId: null,
    selectedItemId: null,
    roomId: null,
    playerName: null,
    loading: false,
    playersJoined: [],
    currentPlayer: {
        id: "",
        name: "",
        roomId: "",
    },

    // Placeholder functions (will be overridden by the store)
    setSelectedCategoryId: () => { },
    setSelectedItemId: () => { },
    setRoomId: () => { },
    setPlayerName: () => { },
    setLoading: () => { },
    setPlayersJoined: () => { },
    setCurrentPlayer: () => { },
    addPlayer: () => { },
    removePlayer: () => { },
    resetPlayersJoined: () => { },
    clearState: () => { },
};

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            ...initialState,

            // Actions
            setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
            setSelectedItemId: (id) => set({ selectedItemId: id }),
            setRoomId: (id) => set({ roomId: id }),
            setPlayerName: (name) => set({ playerName: name }),
            setLoading: (isLoading) => set({ loading: isLoading }),

            setPlayersJoined: (players) => set({ playersJoined: players }),
            setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
            addPlayer: (player) =>
                set((state) => ({ playersJoined: [...state.playersJoined, player] })),
            removePlayer: (playerId) =>
                set((state) => ({
                    playersJoined: state.playersJoined.filter((player) => player.id !== playerId),
                })),
            resetPlayersJoined: () => set({ playersJoined: [] }),

            // Clear state action
            clearState: () => {
                set(initialState); // Reset in-memory state to initial values
                useGlobalStore.persist.clearStorage(); // Clear persisted state from localStorage
            },
        }),
        {
            name: "game-state", // Storage key
            storage: createJSONStorage(() => localStorage), // Use localStorage
        }
    )
);