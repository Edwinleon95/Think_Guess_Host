import { FC } from 'react';
import { motion } from "framer-motion";
import { useGlobalStore } from "../store";

interface TimesUpScreenProps {
    startNewQuestion: () => void;
}

const TimesUpScreen: FC<TimesUpScreenProps> = ({ startNewQuestion }) => {
    const { currentQuestion, answers, loading } = useGlobalStore();


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6 overflow-hidden"
        >
            <div className="w-full max-w-6xl h-screen md:h-full flex flex-col justify-center overflow-y-auto">
                {/* Title Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
                        🕒 Time's Up!
                    </h1>
                    <p className="text-xl text-white/90">
                        The correct answer was:
                    </p>
                </motion.div>

                {/* Correct Answer Display */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mx-auto w-full max-w-2xl text-center mb-12 border-2 border-green-400 shadow-xl"
                >
                    <h2 className="text-4xl font-bold text-green-400">
                        {currentQuestion?.name}
                    </h2>
                </motion.div>

                {/* Answers Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full max-w-6xl mx-auto flex-1 overflow-y-auto pb-8"
                >
                    <h2 className="text-2xl font-semibold mb-8 text-white text-center">
                        Players' Answers:
                    </h2>

                    {loading ? (
                        // Loading Skeletons
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 h-24 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : answers.length === 0 ? (
                        // No Answers Message
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center text-white/80 text-xl"
                        >
                            No answers were submitted. 😢
                        </motion.div>
                    ) : (
                        // Answers List
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                            {answers.map((answer) => (
                                <motion.div
                                    key={answer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + answer.id * 0.05 }}
                                    className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border-l-4 ${answer.isCorrect
                                            ? 'border-green-500'
                                            : 'border-red-500'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-lg font-semibold text-white">
                                            {answer.player.name}
                                        </div>
                                    </div>
                                    <div className="text-white/90 break-words">
                                        {answer.answer}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Next Question Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-8"
                >
                    <button
                        onClick={startNewQuestion}
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                                Loading...
                            </div>
                        ) : (
                            'Next Question'
                        )}
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TimesUpScreen;