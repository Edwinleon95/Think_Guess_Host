import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExternalLinkIcon from '../assets/ExternalLinkIcon';

const Landing = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/home');
    };

    const handlePortfolioClick = () => {
        window.open('https://webdevinnovation.com/', '_blank');
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-purple-700 relative" // Added relative for positioning
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                onClick={handlePortfolioClick}
                className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-white/80 group-hover:text-white text-sm font-medium">
                        Made by webdevinnovation
                    </span>
                    <ExternalLinkIcon className="text-white/60 group-hover:text-white" />
                </div>
            </motion.button>

            {/* Main Content */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
                Welcome to
            </h1>
            <h2 className="text-5xl md:text-8xl font-extrabold text-yellow-300 mb-8 text-center drop-shadow-lg">
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