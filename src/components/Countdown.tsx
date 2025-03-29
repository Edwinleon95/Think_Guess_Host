import React from "react";

interface CountdownProps {
    countdown: number;
}

export const Countdown: React.FC<CountdownProps> = ({ countdown }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
            <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold mb-4">
                    The game starts in:
                </div>
                <div className="text-9xl font-bold animate-pulse">
                    {countdown}
                </div>
            </div>
        </div>
    );
};