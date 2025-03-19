import { motion } from "framer-motion";
import { useGlobalStore } from "../store";

const QuestionsScreen = () => {
    const { currentQuestion, secondCountdown, setSecondCountdown } = useGlobalStore();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} // Faster transition for the main container
            className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6 overflow-hidden"
        >
            {/* Countdown Timer (Top-Right Corner) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }} // Faster transition for the countdown timer
                className="absolute top-6 right-6 text-6xl font-bold text-red-400 animate-pulse"
            >
                {secondCountdown}
            </motion.div>

            {/* Main Content Grid */}
            <div className="h-screen flex flex-col lg:flex-row items-center justify-center gap-8 overflow-hidden">
                {/* Image Section (Left Side) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }} // Faster transition for the image section
                    className="w-full lg:w-1/2 h-full flex items-center justify-center overflow-hidden"
                >
                    <img
                        src={currentQuestion?.image}
                        alt="Question Visual"
                        className="w-full h-full max-h-[80vh] object-cover rounded-2xl shadow-2xl"
                    />
                </motion.div>

                {/* Text Section (Right Side) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }} // Faster transition with reduced delay for the text section
                    className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center text-center overflow-y-auto p-4"
                >
                    <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
                        🏁 Let's do it! 🏁
                    </h1>
                    <p className="text-lg mb-6 text-white/90">
                        Answer the question before time runs out! ⏳
                    </p>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-2xl border-2 border-white/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            Your Question:
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
        </motion.div>
    );
};

export default QuestionsScreen;