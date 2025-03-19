import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        navigate('/create-room');
    };

    const handleCreateTopic = () => {
        // Optionally show a toast or message
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
        >
            <h1
                className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center drop-shadow-lg"
            >
                Let’s Get Started!
            </h1>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                {/* Create Room Card */}
                <div className="flex-1 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center hover:scale-105 hover:shadow-3xl transition-all duration-300">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        Create a Room
                    </h2>
                    <button
                        onClick={handleCreateRoom}
                        className="px-8 py-4 text-lg md:text-2xl font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                    >
                        Start Now
                    </button>
                </div>

                {/* Create Topic Card */}
                <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center opacity-70 cursor-not-allowed">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        Create a Category
                    </h2>
                    <button
                        onClick={handleCreateTopic}
                        className="px-8 py-4 text-lg md:text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl transition-all duration-300 cursor-not-allowed shadow-md"
                        disabled
                    >
                        Coming Soon
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
