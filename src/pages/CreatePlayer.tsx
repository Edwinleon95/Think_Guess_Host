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
    const { setPlayerName, setLoading, setRoomId, setCurrentPlayer } = useGlobalStore();


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleCreatePlayer = async () => {
        if (!name.trim()) return alert("Please enter your name");

        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/players`, {
                name,
                roomId: roomId,
            });

            // Save player name to the global state (Zustand store)
            setPlayerName(name);
            setRoomId(roomId);
            setCurrentPlayer(response.data);
            // Navigate to the waiting zone after creating the player
            navigate(`/gaming-zone/waiting`);
        } catch (error) {
            console.error("Error creating player:", error);
            alert("Failed to create player. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
            {/* Room Title */}
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
                Join Room: {roomId}
            </h1>

            {/* Name Input */}
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">
                    Enter Your Name
                </h2>
                <input
                    type="text"
                    placeholder="Type your name here..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <button
                    onClick={handleCreatePlayer}
                    className={`w-full mt-4 px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-200 ${name ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!name}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default CreatePlayer;
