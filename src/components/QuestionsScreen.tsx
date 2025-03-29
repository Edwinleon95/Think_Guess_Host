import { motion } from "framer-motion";
import { QuestionsCount } from "./QuestionsCount";
import { Question } from '../types/question.interface'; // Assuming you have this type

interface QuestionsScreenProps {
    currentQuestion: Question | null;
    secondCountdown: number;
    setSecondCountdown: (value: number) => void;
    answerLeft: number | null;
}

export const QuestionsScreen: React.FC<QuestionsScreenProps> = ({
    currentQuestion,
    secondCountdown,
    setSecondCountdown,
    answerLeft
}) => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6"
        >
            {/* Top Info Bar (Countdown + Players Left) */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-6xl font-bold text-red-400 animate-pulse"
                >
                    {secondCountdown}
                </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12 w-full max-w-screen-lg">
                {/* Image Section (Left Side) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-md lg:max-w-xl flex flex-col items-center"
                >
                    {/* Players Left to Answer - Above Image */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 w-full text-center"
                    >
                        <div className="inline-flex items-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border-2 border-white/20">
                            <span className="text-white/90 text-lg font-medium mr-2">
                                {answerLeft === null ? (
                                    "All players need to answer!"
                                ) : answerLeft === 1 ? (
                                    "1 player still needs to answer!"
                                ) : (
                                    `${answerLeft} players still need to answer!`
                                )}
                            </span>
                            <span className="text-yellow-300 text-xl">⚡</span>
                        </div>
                    </motion.div>

                    <img
                        src={currentQuestion?.image}
                        alt="Question Visual"
                        className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-2xl"
                    />
                </motion.div>

                {/* Text Section (Right Side) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="w-full max-w-md lg:max-w-xl flex flex-col items-center text-center p-6"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
                        🏁 Let's do it! 🏁
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-white/90">
                        Answer the question before time runs out! ⏳
                    </p>
                    <div className="bg-white/10 p-8 rounded-2xl w-full max-w-2xl border-2 border-white/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            Description:
                        </h2>
                        <p className="text-xl text-white/90">
                            {currentQuestion?.description}
                        </p>
                    </div>

                    {/* Styled Button */}
                    <button
                        onClick={() => setSecondCountdown(0)}
                        className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                    >
                        Answer
                    </button>
                </motion.div>
            </div>
            <QuestionsCount />
        </motion.div>
    );
};

export default QuestionsScreen;