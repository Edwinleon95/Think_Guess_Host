import { FC } from 'react';
import { motion } from 'framer-motion';

interface FinishGameScreenProps {
    resetGame: () => void;
}
export const FinishGameScreen: FC<FinishGameScreenProps> = ({ resetGame }) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-6">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-extrabold mb-6 drop-shadow-lg text-center"
            >
                🎉 Congratulations! 🎉
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl mb-8 text-gray-200 font-medium text-center"
            >
                You've answered all the questions! Great job! 🚀
            </motion.p>

            {/* Finish Game Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={resetGame}
            >
                Finish Game
            </motion.button>

            {/* Optional: Add a decorative element */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 text-gray-300 text-sm"
            >
                Made with ❤️ by Your classmate Edwin 🤟
            </motion.div>
        </div>
    );
};