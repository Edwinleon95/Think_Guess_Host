import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Player } from "./types/player.interface";
import { Question } from "./types/question.interface";
import { Answer } from "./types/answer.interface";

interface GlobalState {
    // Persisted states
    selectedCategoryId: number | null;
    selectedItemId: number | null;
    roomId: number | null;
    playersJoined: Player[];

    // Non-persisted states
    currentQuestion: Question | null;
    answers: Answer[];
    loading: boolean;
    secondCountdown: number;
    countdown: number;

    // Actions for persisted states
    setSelectedCategoryId: (id: number) => void;
    setSelectedItemId: (id: number) => void;
    setRoomId: (id: number) => void;
    setPlayersJoined: (players: Player[]) => void;

    // Actions for non-persisted states
    setCurrentQuestion: (question: Question | null) => void;
    setAnswers: (answers: Answer[]) => void;
    setLoading: (loading: boolean) => void;
    setSecondCountdown: (seconds: number) => void;
    setCountdown: (seconds: number) => void;

    // Clear state action
    clearState: () => void;
}

// Define initial state for resetting
const initialState: GlobalState = {
    selectedCategoryId: null,
    selectedItemId: null,
    roomId: null,
    playersJoined: [],

    currentQuestion: null,
    answers: [],
    loading: false,
    secondCountdown: 0,
    countdown: 0,

    // Placeholder functions (will be overridden by the store)
    setSelectedCategoryId: () => {},
    setSelectedItemId: () => {},
    setRoomId: () => {},
    setPlayersJoined: () => {},
    setCurrentQuestion: () => {},
    setAnswers: () => {},
    setLoading: () => {},
    setSecondCountdown: () => {},
    setCountdown: () => {},
    clearState: () => {},
};

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            ...initialState,

            // Persisted actions
            setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
            setSelectedItemId: (id) => set({ selectedItemId: id }),
            setRoomId: (id) => set({ roomId: id }),
            setPlayersJoined: (players) => set({ playersJoined: players }),

            // Non-persisted actions
            setCurrentQuestion: (question) => set({ currentQuestion: question }),
            setAnswers: (answers) => set({ answers }),
            setLoading: (loading) => set({ loading }),
            setSecondCountdown: (seconds) => set({ secondCountdown: seconds }),
            setCountdown: (seconds) => set({ countdown: seconds }),

            // Clear state action
            clearState: () => {
                set(initialState); // Reset in-memory state to initial values
                useGlobalStore.persist.clearStorage(); // Clear persisted state from localStorage
            },
        }),
        {
            name: "game-state", // Storage key
            storage: createJSONStorage(() => localStorage), // Use localStorage

            // Only persist the following fields
            partialize: (state) => ({
                selectedCategoryId: state.selectedCategoryId,
                selectedItemId: state.selectedItemId,
                roomId: state.roomId,
                playersJoined: state.playersJoined,
                // currentQuestion, answers, loading, secondCountdown , countdown are NOT persisted
            }),
        }
    )
);
