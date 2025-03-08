const FinishGame = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
            {/* Outer Card */}
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center animate-pulse">
                    Thanks for playing!
                </h2>
                {/* Additional Message */}
                <p className="text-lg text-gray-600 mt-6 text-center">
                    We hope you enjoyed the game. See you next time!
                </p>
            </div>
        </div>
    );
};

export default FinishGame;