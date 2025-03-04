import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import defaultProfile from "/defaultProfile.svg"; // Import the default profile image

interface Player {
    id: number;
    name: string;
}

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL
const BACKEND_URL = "http://localhost:3000";

const PlayerList = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL
    const [players, setPlayers] = useState<Player[]>([]);


    useEffect(() => {
        if (!roomId) return;

        const newSocket = io(BACKEND_URL, {
            query: { "ngrok-skip-browser-warning": "true" },
        });

        newSocket.emit("joinRoom", roomId);

        newSocket.on("currentPlayers", (newPlayers) => {
            console.log("Current players:", newPlayers);
            setPlayers(newPlayers);
        });


        return () => {
            newSocket.disconnect();
        };
    }, [roomId]); // Reconnect if roomId changes

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
