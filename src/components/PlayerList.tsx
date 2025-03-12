import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import defaultProfile from "/defaultProfile.svg"; // Import default profile image
import { useGlobalStore } from "../store";
import { SOCKET } from "../services/socket";

interface Player {
    id: number;
    name: string;
    room: {
        id: number;
    };
}

const PlayerList = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL
    const [players, setPlayers] = useState<Player[]>([]);

    const setPlayersJoined = useGlobalStore((state) => state.setPlayersJoined);

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
        <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Players in Room {roomId}
            </h2>
            {players.length === 0 ? (
                <p className="text-gray-500">No players yet...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {players.map((player) => (
                        <div
                            key={player.id}
                            className="p-4 bg-gray-100 shadow-md rounded-lg flex flex-col items-center transition hover:bg-gray-200"
                        >
                            <img
                                src={defaultProfile}
                                alt={`${player.name}'s profile`}
                                className="w-16 h-16 rounded-full mb-2 border border-gray-300"
                            />
                            <p className="text-lg font-semibold text-gray-700">{player.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlayerList;
