import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import PlayerList from "../components/PlayerList";

const Room = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Get roomId from URL
    const qrValue = `${window.location.origin}/create-player?roomId=${roomId}`; // Generate URL with roomId

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
            {/* Header Section */}
            <div className="w-full max-w-4xl flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
                {/* Room Title */}
                <h1 className="text-3xl font-bold text-gray-800">
                    Room <span className="text-blue-500">#{roomId}</span>
                </h1>

                {/* QR Code (Small & in Corner) */}
                <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                    <QRCodeCanvas value={qrValue} size={80} />
                </div>
            </div>

            {/* Player List */}
            <div className="mt-6 w-full max-w-4xl">
                <PlayerList />
            </div>
        </div>
    );
};

export default Room;
