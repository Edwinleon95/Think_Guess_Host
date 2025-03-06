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
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Waiting for Players...</h2>

            {/* Player Card */}
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <img
                    src={defaultProfile}
                    alt="Player avatar"
                    className="w-20 h-20 rounded-full mb-2 border border-gray-300"
                />
                <p className="text-lg font-semibold text-gray-700">{playerName || "Waiting..."}</p>
            </div>
        </div>
    );
};

export default WaitingZone;
