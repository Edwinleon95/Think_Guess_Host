import { useGlobalStore } from "../store"; // Import Zustand store
import defaultProfile from "/defaultProfile.svg"; // Import the default profile image

const WaitingZone = () => {
    // Access the player name from Zustand store
    const playerName = useGlobalStore((state) => state.playerName);

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
