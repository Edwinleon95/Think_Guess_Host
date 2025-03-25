export const LoadingBar = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
            <div className="flex flex-col items-center">
                {/* Progress Bar */}
                <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full animate-progress"></div>
                </div>

                {/* Loading Text */}
                <p className="mt-2 text-white font-semibold animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    )
};