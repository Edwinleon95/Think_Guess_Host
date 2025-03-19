import { motion } from 'framer-motion';

export const Raffle = () => {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-2xl text-center mb-8 border-2 border-white/20 shadow-2xl"
        >
            {/* Raffle Headline */}
            <h2 className="text-4xl font-bold mb-4 text-yellow-400 animate-pulse">
                🚴‍♂️ Win My Bike! 🚴‍♂️
            </h2>

            {/* Raffle Description */}
            <p className="text-xl mb-6 text-gray-200">
                Join the raffle to win my beloved bike! Call now and don’t miss your chance to get this amazing prize
            </p>

            {/* Bike Image */}
            <motion.img
                src="/bikeRaffle.jpeg" // Replace with the actual path to your bike image
                alt="Raffle Bike"
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            />

            {/* Call Now Button */}
            <div
                className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
            >
                📞 Call Now:+61 0452 069 981
            </div>
        </motion.div>
    );
};