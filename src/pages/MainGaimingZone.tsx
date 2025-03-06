import { useState, useEffect } from "react";
// import { useGlobalStore } from "../store";

const MainGaimingZone = () => {
    const [countdown, setCountdown] = useState(5);
    // const { selectedCategoryId } = useGlobalStore();

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            console.log('Countdown finished! Game starting now!');
        }
    }, [countdown]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-6">
            {/* Countdown Timer */}
            {countdown > 0 && (
                <div className="text-9xl font-bold animate-pulse mb-8">
                    {countdown}
                </div>
            )}

            {/* Welcome Message */}
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
                🎉 Welcome to the Game! 🎮
            </h1>
            <p className="text-lg mb-6 text-gray-200">Get ready for an exciting challenge! 🚀</p>

            {/* Game Card */}
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-4 text-indigo-600">Game On! 🔥</h2>
                <p className="text-lg text-gray-600">Prepare yourself for an epic experience.</p>
            </div>
        </div>
    );
};

export default MainGaimingZone;