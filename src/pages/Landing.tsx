import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/home');
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
        >
            <h1
                className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center drop-shadow-lg"
            >
                Welcome to
            </h1>
            <h2
                className="text-5xl md:text-8xl font-extrabold text-yellow-300 mb-8 text-center drop-shadow-lg"
            >
                Think & Guess
            </h2>

            <button
                onClick={handleStart}
                className="px-8 py-4 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
            >
                Start Game
            </button>
        </motion.div>
    );
};

export default Landing;
