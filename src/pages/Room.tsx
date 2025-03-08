import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useGlobalStore } from "../store"; // Zustand store
import PlayerList from "../components/PlayerList";
import { SOCKET } from "../services/socket";
import { useEffect, useCallback } from "react";

const Room = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL
    const navigate = useNavigate();
    const qrValue = `${window.location.origin}/create-player?roomId=${roomId}`;
    const { setRoomId } = useGlobalStore();

    // Get players from Zustand store
    const players = useGlobalStore((state) => state.playersJoined);

    // Memoized function to handle game start
    const handleStartGame = useCallback((startGame: boolean) => {
        if (startGame) {
            navigate(`/gaiming-zone/main`);
        }
    }, [navigate]);

    useEffect(() => {
        if (!roomId) return;
        setRoomId(Number(roomId));
        SOCKET.on("startGame", handleStartGame);

        return () => {
            SOCKET.off("startGame", handleStartGame);
        };
    }, [roomId, handleStartGame]); // Proper dependencies

    const startGame = () => {
        if (!roomId) return;
        SOCKET.emit("startGame", roomId);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
            {/* Header Section */}
            <div className="w-full max-w-4xl flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
                {/* Room Title */}
                <h1 className="text-3xl font-bold text-gray-800">
                    Room <span className="text-blue-500">#{roomId}</span>
                </h1>

                {/* QR Code */}
                <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                    <QRCodeCanvas value={qrValue} size={80} />
                </div>
            </div>

            {/* Player List */}
            <div className="mt-6 w-full max-w-4xl">
                <PlayerList />
            </div>

            {/* Start Game Button (only if more than 1 player) */}
            {players.length > 1 && (
                <button
                    onClick={startGame}
                    className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Start Game
                </button>
            )}
        </div>
    );
};

export default Room;
