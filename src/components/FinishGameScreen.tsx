import { FC } from 'react';

interface FinishGameScreenProps {
    resetGame: () => void;
}
export const FinishGameScreen: FC<FinishGameScreenProps> = ({ resetGame }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-6">
            {/* Title */}
            <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg animate-fade-in">
                🎉 Congratulations! 🎉
            </h1>

            {/* Subtitle */}
            <p className="text-2xl mb-8 text-gray-200 font-medium text-center">
                You've answered all the questions! Great job! 🚀
            </p>

            {/* Finish Game Button */}
            <button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={resetGame}
            >
                Finish Game
            </button>

            {/* Optional: Add a decorative element */}
            <div className="mt-12 text-gray-300 text-sm">
                Made with ❤️ by Your classmate Edwin 🤟
            </div>
        </div>
    );
}