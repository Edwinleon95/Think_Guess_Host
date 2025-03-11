import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useGlobalStore } from "../store";
import CreateButton from "../components/CreateButton";


interface Player {
    id: number;
    name: string;
    room: {
        id: number;
    };
}

const CreatePlayer = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const roomId = Number(searchParams.get("roomId"));

    const { setPlayerName, setRoomId, setCurrentPlayer } = useGlobalStore();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleCreatePlayer = async (): Promise<void> => {
        if (!name.trim()) {
            toast.warning("Please enter your name");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post<Player>(`${BACKEND_URL}/players`, {
                name,
                roomId,
            });

            setPlayerName(name);
            setRoomId(roomId);
            setCurrentPlayer(response.data);
            navigate(`/gaming-zone/waiting`);

        } catch (error: unknown) {
            console.error("Error creating player:", error);

            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to create player"
                : "Failed to create player. Please try again.";

            toast.error(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    if (!roomId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center text-white p-6 rounded-xl bg-red-500/90 backdrop-blur-sm"
                >
                    <h2 className="text-2xl font-bold mb-2">Invalid Room</h2>
                    <p className="text-lg">Please scan the QR code again</p>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6"
        >
            {/* Room Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8 text-center"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Join Room
                </h1>
                <p className="text-xl text-white/90">#{roomId}</p>
            </motion.div>

            {/* Input Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-xs sm:max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
            >
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Enter Your Name
                </h2>

                <input
                    type="text"
                    placeholder="Your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-lg bg-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    autoFocus
                />

                <div className="mt-6">
                    <CreateButton
                        onClick={handleCreatePlayer}
                        disabled={!name.trim()}
                        loading={loading}
                        className="w-full text-lg py-3"
                    >
                        {loading ? 'Joining Room...' : 'Join Room'}
                    </CreateButton>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CreatePlayer;