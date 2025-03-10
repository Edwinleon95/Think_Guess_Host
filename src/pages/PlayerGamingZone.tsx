import { useState, useEffect } from "react";
import { useGlobalStore } from "../store";
import { SOCKET } from "../services/socket"; // Import your SOCKET instance
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PlayerGamingZone = () => {
    const [countdown, setCountdown] = useState(0);
    const [dataIsReady, setDataIsReady] = useState(false); // Add state for data readiness
    const [answerIsReady, setAnswerIsReady] = useState(false); // Add state for data readiness
    const [answer, setAnswer] = useState(""); // Add state for data readiness
    const [idQuestion, setIdQuestion] = useState(0);
    const { currentPlayer, roomId, playerName } = useGlobalStore();
    const navigate = useNavigate();

    // Function to start the countdown
    useEffect(() => {
        if (countdown > 0 && dataIsReady) { // Only start countdown if data is ready
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            console.log('Countdown finished! Game starting now!');
        }
    }, [countdown, dataIsReady]); // Add dataIsReady as a dependency

    // Socket logic for loadingGame
    useEffect(() => {
        // Emit the loadingGame event to the server
        SOCKET.emit("loadingGamePlayer", roomId);

        // Listen for the loadingGame event from the server
        SOCKET.on("loadingGame", (dataIsReady: boolean) => {
            setDataIsReady(dataIsReady); // Update dataIsReady state
            setCountdown(5); // Start the countdown
        });

        SOCKET.on("answerQuestion", async ({ answer, answerIsReady }) => {
            console.log("Answer received:", answer, answerIsReady);
            setAnswerIsReady(answerIsReady); // Update dataIsReady state
            if (!answerIsReady) {
                setAnswer(""); // Clear the answer state only if answerIsReady is true
            }
        });

        SOCKET.on("currentQuestion", (idQuestion) => {
            console.log("Current question:", idQuestion);
            setIdQuestion(idQuestion); // Update dataIsReady state
        });

        SOCKET.on("finishGame", async (finishGame) => {
            console.log("Answer received:", finishGame);
            if (finishGame) {
                //TODO: Add logic to clear the state
                // clearState();
                navigate("/gaming-zone/finish");
            }
        });

        // Clean up the socket listener
        return () => {
            SOCKET.off("loadingGame");
            SOCKET.off("answerQuestion");
            SOCKET.off("currentQuestion");
            SOCKET.off("finishGame");
        };
    }, [roomId]);

    const submitAnswer = async () => {
        try {
            // Ensure required fields are defined
            if (!currentPlayer?.id || !roomId || !answer) {
                console.error("Missing required fields");
                return;
            }

            // Send the POST request
            const response = await axios.post(
                `${BACKEND_URL}/answers`,
                {
                    answer: answer,
                    roomId: roomId,
                    playerId: currentPlayer.id,
                    itemId: idQuestion, // Replace with a valid itemId or handle accordingly
                }
            );

            // Log the response data
            console.log("Answer submitted successfully:", response.data);
            setAnswerIsReady(true); // Update answerIsReady state
        } catch (error) {
            console.error("Error submitting answer:", error);

            // Provide more detailed error feedback
            if (axios.isAxiosError(error)) {
                console.error("Server responded with:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-6">
            {/* Show loading bar when data is not ready */}
            {!dataIsReady ? (
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
            ) : (
                // Show countdown or game UI when data is ready
                <>
                    {countdown > 0 ? (
                        <div className="flex flex-col items-center transition-opacity duration-500">
                            <div className="text-2xl font-semibold mb-4">
                                The game starts in:
                            </div>
                            <div className="text-9xl font-bold animate-pulse">
                                {countdown}
                            </div>
                        </div>
                    ) : answerIsReady ? (
                        // Show the answer when showAnswer is true
                        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto text-center">
                            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                                The Answer
                            </h2>
                            <p className="text-lg text-gray-700">
                                The answer is <span className="font-semibold text-indigo-500">{answer}</span>.
                            </p>
                        </div>
                    ) : (
                        <div className="transition-opacity duration-500 opacity-100">
                            {/* Player Name */}
                            <h1 className="text-3xl font-bold mb-4 drop-shadow-lg animate-fade-in text-center">
                                Player: {playerName}
                            </h1>

                            {/* Answer Input */}
                            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
                                <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">
                                    Your Answer
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Type your answer here..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                                <button
                                    className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors duration-200 cursor-pointer"
                                    onClick={submitAnswer}
                                >
                                    Submit Answer
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PlayerGamingZone;