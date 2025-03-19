import { useGlobalStore } from "../store"

export const Countdown = () => {
    const { countdown } = useGlobalStore();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-6">
            <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold mb-4">
                    The game starts in:
                </div>
                <div className="text-9xl font-bold animate-pulse">
                    {countdown}
                </div>
            </div>
        </div>
    )
}