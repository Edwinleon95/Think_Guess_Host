import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Player {
    id: string;
    name: string;
    roomId: string;
}

interface GlobalState {
    selectedCategoryId: number | null;
    selectedItemId: number | null;
    roomId: number | null;
    playerName: string | null;
    loading: boolean;
    playersJoined: Player[];

    setSelectedCategoryId: (id: number) => void;
    setSelectedItemId: (id: number) => void;
    setRoomId: (id: number) => void;
    setPlayerName: (name: string) => void;
    setLoading: (isLoading: boolean) => void;

    setPlayersJoined: (players: Player[]) => void;
    addPlayer: (player: Player) => void;
    removePlayer: (playerId: string) => void;
    resetPlayersJoined: () => void;
}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            selectedCategoryId: null,
            selectedItemId: null,
            roomId: null,
            playerName: null,
            loading: false,
            playersJoined: [],

            setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
            setSelectedItemId: (id) => set({ selectedItemId: id }),
            setRoomId: (id) => set({ roomId: id }),
            setPlayerName: (name) => set({ playerName: name }),
            setLoading: (isLoading) => set({ loading: isLoading }),

            setPlayersJoined: (players) => set({ playersJoined: players }),
            addPlayer: (player) =>
                set((state) => ({ playersJoined: [...state.playersJoined, player] })),
            removePlayer: (playerId) =>
                set((state) => ({
                    playersJoined: state.playersJoined.filter((player) => player.id !== playerId),
                })),
            resetPlayersJoined: () => set({ playersJoined: [] }),
        }),
        {
            name: "game-state", // Storage key
            storage: createJSONStorage(() => localStorage), // Correct way to use localStorage
        }
    )
);
