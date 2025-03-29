import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Player } from "./types/player.interface";
import { Answer } from "./types/answer.interface";

interface GlobalState {
    // Persisted states
    selectedCategoryId: number | null;
    selectedItemId: number | null;
    roomId: number | null;
    playersJoined: Player[];

    // Non-persisted states
    answers: Answer[];
    questionsLength: number;  // Only questionsLength is retained here
    questionNumber: number;   // Only questionNumber is retained here

    // Actions for persisted states
    setSelectedCategoryId: (id: number) => void;
    setSelectedItemId: (id: number) => void;
    setRoomId: (id: number) => void;
    setPlayersJoined: (players: Player[]) => void;

    // Non-persisted actions
    setAnswers: (answers: Answer[]) => void;
    setQuestionsLength: (length: number) => void;       // Action for setting questionsLength
    setQuestionNumber: (number: number) => void;        // Action for setting questionNumber

    // Clear state action
    clearState: () => void;
}

// Define initial state for resetting
const initialState: GlobalState = {
    selectedCategoryId: null,
    selectedItemId: null,
    roomId: null,
    playersJoined: [],

    answers: [],
    questionsLength: 0,
    questionNumber: 0,

    // Placeholder functions (will be overridden by the store)
    setSelectedCategoryId: () => { },
    setSelectedItemId: () => { },
    setRoomId: () => { },
    setPlayersJoined: () => { },
    setAnswers: () => { },
    setQuestionsLength: () => { },
    setQuestionNumber: () => { },
    clearState: () => { },
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
            setAnswers: (answers) => set({ answers }),
            setQuestionsLength: (length) => set({ questionsLength: length }),
            setQuestionNumber: (number) => set({ questionNumber: number }),

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
                // answers, questionsLength, and questionNumber are NOT persisted
            }),
        }
    )
);