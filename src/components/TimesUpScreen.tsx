import { FC, useMemo } from 'react';
import { motion } from "framer-motion";
import { useGlobalStore } from "../store";
import { QuestionsCount } from './QuestionsCount';

interface TimesUpScreenProps {
    startNewQuestion: () => void;
}

const TimesUpScreen: FC<TimesUpScreenProps> = ({ startNewQuestion }) => {
    const { currentQuestion, answers, loading } = useGlobalStore();

    // Memoize the answers grid to prevent unnecessary re-renders
    const answersGrid = useMemo(() => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                    {Array.from({ length: Math.min(4, answers.length || 4) }).map((_, index) => (
                        <div
                            key={`skeleton-${index}`}
                            className="bg-white/10 rounded-xl p-4 h-24 animate-pulse"
                        />
                    ))}
                </div>
            );
        }

        if (answers.length === 0) {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-center text-white/80 text-xl"
                >
                    No answers were submitted. 😢
                </motion.div>
            );
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                {answers.map((answer, index) => (
                    <motion.div
                        key={`answer-${answer.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.03 // Minimal staggered delay
                        }}
                        className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 ${answer.isCorrect ? 'border-green-500' : 'border-red-500'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-lg font-semibold text-white">
                                {answer.player.name}
                            </div>
                            <div className="flex items-center bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                                ✅ {answer.player.correctAnswers} Correct
                            </div>
                        </div>
                        <div className="text-white/90 break-words">
                            {answer.answer}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }, [loading, answers]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6 overflow-hidden"
        >
            <div className="w-full max-w-6xl h-screen md:h-full flex flex-col justify-center overflow-y-auto">
                {/* Title Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
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
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-auto w-full max-w-2xl text-center mb-12 border-2 border-green-400 shadow-lg"
                >
                    <h2 className="text-4xl font-bold text-green-400">
                        {currentQuestion?.name}
                    </h2>
                </motion.div>

                {/* Answers Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-6xl mx-auto flex-1 overflow-y-auto pb-8"
                >
                    <h2 className="text-2xl font-semibold mb-8 text-white text-center">
                        Players' Answers:
                    </h2>
                    {answersGrid}
                </motion.div>

                {/* Next Question Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    className="text-center mt-8"
                >
                    <button
                        onClick={startNewQuestion}
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                                Loading...
                            </span>
                        ) : (
                            'Next Question'
                        )}
                    </button>
                </motion.div>
            </div>
            <QuestionsCount />
        </motion.div>
    );
};

export default TimesUpScreen;