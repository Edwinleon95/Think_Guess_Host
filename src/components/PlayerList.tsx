import { useEffect, useState, useCallback } from "react";
import defaultProfile from "/defaultProfile.svg"; // Import default profile image
import { useGlobalStore } from "../store";
import { SOCKET } from "../services/socket";
import { motion } from "framer-motion";
import { Player } from "../types/player.interface";


const PlayerList = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const { setPlayersJoined, roomId } = useGlobalStore();

    // Memoized function to update players
    const handleCurrentPlayers = useCallback(
        (newPlayers: Player[]) => {
            setPlayersJoined(newPlayers);
            setPlayers(newPlayers);
        },
        [setPlayersJoined]
    );

    useEffect(() => {
        if (!roomId) return;

        SOCKET.emit("joinRoom", roomId);
        SOCKET.on("currentPlayers", handleCurrentPlayers);

        return () => {
            SOCKET.off("currentPlayers", handleCurrentPlayers);
        };
    }, [roomId, handleCurrentPlayers]); // Include dependencies properly

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8"
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                Players in Room{" "}
                <span className="text-yellow-400 font-extrabold">#{roomId}</span>
            </h2>

            {players.length === 0 ? (
                <p className="text-white text-center text-lg">No players joined yet...</p>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                >
                    {players.map((player) => (
                        <motion.div
                            key={player.id}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md transition-all"
                        >
                            <img
                                src={defaultProfile}
                                alt={`${player.name}'s profile`}
                                className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3"
                            />
                            <p className="text-white font-semibold text-lg">{player.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default PlayerList;
