import { useEffect } from "react";
import { useGlobalStore } from "../store"; // Import Zustand store
import defaultProfile from "/defaultProfile.svg"; // Import the default profile image
import { SOCKET } from "../services/socket";
import { useNavigate } from "react-router-dom";

const WaitingZone = () => {
    // Access state from Zustand store
    const playerName = useGlobalStore((state) => state.playerName);
    const roomId = useGlobalStore((state) => state.roomId);

    const navigate = useNavigate(); // ✅ Move useNavigate OUTSIDE useEffect

    useEffect(() => {
        console.log("WaitingZone roomId:", roomId);
        if (!roomId) return; // Prevent emitting if roomId is not set

        SOCKET.emit("waitingZone", roomId.toString());

        const handleStartGame = (startGame: boolean) => {
            if (startGame) {
                navigate(`/gaiming-zone/player`);
            }
        };

        SOCKET.on("waitingZone", handleStartGame);

        return () => {
            SOCKET.off("waitingZone", handleStartGame); // ✅ Clean up listener
        };
    }, [roomId, navigate]); // ✅ Added roomId & navigate to dependencies

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
            {/* Outer Card */}
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center animate-pulse">
                    Waiting for Players...
                </h2>

                {/* Player Card */}
                <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md w-full">
                    <img
                        src={defaultProfile}
                        alt="Player avatar"
                        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-200"
                    />
                    <p className="text-xl font-semibold text-gray-700">
                        {playerName || "Waiting..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WaitingZone;
