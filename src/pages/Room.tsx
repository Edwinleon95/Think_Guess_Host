import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useGlobalStore } from "../store";
import PlayerList from "../components/PlayerList";
import { SOCKET } from "../services/socket";
import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import CreateButton from "../components/CreateButton";

const PLAYER_FRONTEND_URL = import.meta.env.VITE_PLAYER_FRONTEND_URL;

const Room = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { roomId, playersJoined } = useGlobalStore();
    const qrValue = `${PLAYER_FRONTEND_URL}/create-player?roomId=${roomId}`;

    const handleStartGame = useCallback((startGame: boolean) => {
        if (startGame) {
            navigate(`/gaming-zone/main`);
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (!roomId) return;
        SOCKET.on("startGame", handleStartGame);

        return () => {
            SOCKET.off("startGame");
        };
    }, [roomId, handleStartGame]);

    const startGame = () => {
        if (!roomId) return;
        setLoading(true);
        if (playersJoined.length < 2) {
            toast.warning("You need at least 2 players to start!");
            return;
        }
        SOCKET.emit("startGame", roomId);
    };

    const copyRoomLink = () => {
        navigator.clipboard.writeText(qrValue);
        toast.success("Room link copied to clipboard!");
    };

    return (
        <motion.div
            className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header Section */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-4 md:space-y-0"
            >
                {/* Room Title */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4"
                >
                    <h1 className="text-4xl font-bold text-white">
                        Room <span className="text-yellow-400">#{roomId}</span>
                    </h1>
                </motion.div>

                {/* QR Code Section */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center space-y-2"
                >
                    <div
                        className="bg-white p-3 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={copyRoomLink}
                    >
                        <QRCodeCanvas
                            value={qrValue}
                            size={120}
                            level="H"
                        />
                    </div>
                    <p className="text-white text-sm font-medium">Click QR to copy link</p>
                </motion.div>
            </motion.div>

            {/* Player List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 w-full max-w-4xl"
            >
                <PlayerList />
            </motion.div>

            {/* Start Game Button */}
            <AnimatePresence>
                {playersJoined.length > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="mt-8"
                    >
                        <CreateButton
                            onClick={startGame}
                            className="px-8 py-4 text-xl"
                            loading={loading}
                            disabled={playersJoined.length < 2}
                        >
                            {playersJoined.length < 2 ? (
                                `Need ${2 - playersJoined.length} more player${playersJoined.length === 1 ? '' : 's'}`
                            ) : (
                                'Start Game 🚀'
                            )}
                        </CreateButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Room;