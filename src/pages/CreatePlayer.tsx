import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useGlobalStore } from "../store"; // Import Zustand store

const CreatePlayer = () => {
    const [searchParams] = useSearchParams();
    const roomId = Number(searchParams.get("roomId")); // Get roomId from URL
    const [name, setName] = useState(""); // Local name state to update input field
    const navigate = useNavigate();

    // Accessing Zustand state for player name and loading
    const setPlayerName = useGlobalStore((state) => state.setPlayerName);
    const setLoading = useGlobalStore((state) => state.setLoading);
    const setRoomId = useGlobalStore((state) => state.setRoomId);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleCreatePlayer = async () => {
        if (!name.trim()) return alert("Please enter your name");

        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/players`, {
                name,
                roomId: roomId,
            }, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });

            // Save player name to the global state (Zustand store)
            setPlayerName(name);
            setRoomId(roomId);
            console.log(response);
            // Navigate to the waiting zone after creating the player
            navigate(`/gaiming-zone/waiting`);
        } catch (error) {
            console.error("Error creating player:", error);
            alert("Failed to create player. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <h1 className="text-3xl font-bold text-white mb-6">Join Room {roomId}</h1>

            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-lg text-black w-72 text-lg mb-4"
            />

            <button
                onClick={handleCreatePlayer}
                className={`px-6 py-3 text-lg font-bold text-white rounded-lg transition duration-300 ${name ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                    }`}
                disabled={!name}
            >
            </button>
        </div>
    );
};

export default CreatePlayer;
