import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalStore } from "../store";
import { SOCKET } from "../services/socket";
import { useNavigate } from "react-router-dom";
import defaultProfile from "/defaultProfile.svg";

const WaitingZone = () => {
    const navigate = useNavigate();
    const { currentPlayer } = useGlobalStore();
    const roomId = currentPlayer?.room?.id;

    const handleStartGame = useCallback((startGame: boolean) => {
        if (startGame) {
            navigate(`/gaming-zone/player`);
        }
    }, [navigate]);

    useEffect(() => {
        if (!roomId) return;

        SOCKET.emit("waitingZone", roomId.toString());
        SOCKET.on("waitingZone", handleStartGame);

        return () => {
            SOCKET.off("waitingZone");
        };
    }, [roomId, handleStartGame]);

    if (!currentPlayer) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-purple-700">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white text-xl"
                >
                    Loading player data...
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
            >
                <AnimatePresence mode="wait">
                    <motion.h2
                        key="waiting-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-3xl font-bold text-center text-white mb-6"
                    >
                        Waiting for Players...
                    </motion.h2>
                </AnimatePresence>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center bg-white/20 p-6 rounded-xl backdrop-blur-md shadow-md transition-all"
                >
                    <motion.img
                        src={defaultProfile}
                        alt="Player avatar"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-3"
                        loading="lazy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                    <p className="text-lg font-semibold text-white truncate max-w-full px-4">
                        {currentPlayer.name || "Waiting..."}
                    </p>
                </motion.div>

                <motion.div
                    className="mt-6 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex items-center space-x-2 text-white/80">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span>Room No: {roomId}</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default WaitingZone;