import { FC } from 'react';
import { motion } from 'framer-motion';
import { Ranking } from '../types/ranking.interface';

interface FinishGameScreenProps {
    resetGame: () => void;
    ranking: Ranking[];
    loading: boolean;
}

export const FinishGameScreen: FC<FinishGameScreenProps> = ({ resetGame, ranking, loading }) => {
    // Sort ranking by position and take top 5
    const topFiveRanking = ranking.slice(0, 5);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-extrabold mb-6 drop-shadow-lg text-center"
            >
                🎉 Game Results 🎉
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl mb-8 text-gray-200 font-medium text-center"
            >
                Here's how everyone performed! 🏆
            </motion.p>

            {/* Ranking List - Vertical Column */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full max-w-md mb-12 min-h-[300px] flex items-center justify-center"
            >
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
                        <p className="text-lg text-gray-300">Loading rankings...</p>
                    </div>
                ) : topFiveRanking.length > 0 ? (
                    <div className="space-y-3 w-full">
                        {topFiveRanking.map((player, index) => (
                            <motion.div
                                key={player.playerId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                                className={`flex items-center justify-between p-4 rounded-xl 
                                    ${player.ranking === 1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600/50 border-l-4 border-yellow-300' :
                                        player.ranking === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500/50 border-l-4 border-gray-300' :
                                            player.ranking === 3 ? 'bg-gradient-to-r from-amber-700 to-amber-800/50 border-l-4 border-amber-600' :
                                                'bg-white/10 border-l-4 border-white/20'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full 
                                        ${player.ranking === 1 ? 'bg-yellow-300 text-yellow-900' :
                                            player.ranking === 2 ? 'bg-gray-300 text-gray-700' :
                                                player.ranking === 3 ? 'bg-amber-600 text-amber-900' :
                                                    'bg-white/20 text-white'}`}
                                    >
                                        {player.ranking <= 3 ? (
                                            player.ranking === 1 ? '🥇' :
                                                player.ranking === 2 ? '🥈' : '🥉'
                                        ) : player.ranking}
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        {player.playerName}
                                    </h3>
                                </div>
                                <div className="text-lg font-semibold">
                                    {player.correctAnswers} {player.correctAnswers === 1 ? 'point' : 'points'}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-300 italic py-8">
                        No players to display
                    </div>
                )}
            </motion.div>

            {/* Finish Game Button - Only show when not loading */}
            {!loading && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 + ranking.length * 0.1 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={resetGame}
                >
                    Finish Game
                </motion.button>
            )}

            {/* Optional: Add a decorative element */}
            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 + ranking.length * 0.1 }}
                    className="mt-12 text-gray-300 text-sm"
                >
                    Made with ❤️ by Your classmate Edwin 🤟
                </motion.div>
            )}
        </div>
    );
};