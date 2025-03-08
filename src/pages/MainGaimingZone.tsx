import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalStore } from "../store";
import { SOCKET } from "../services/socket";

// Define the type for a question item from the API
type Question = {
    id: number;
    name: string; // This is the answer
    image: string; // This is the image URL
    description: string; // This is the question text
    category: {
        id: number;
        name: string;
    };
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MainGaimingZone: React.FC = () => {
    const [countdown, setCountdown] = useState<number>(0);
    const [dataIsReady, setDataIsReady] = useState<boolean>(false); // Set initial state to false
    const [secondCountdown, setSecondCountdown] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const { selectedCategoryId, roomId } = useGlobalStore();

    // Ensure the socket listener is always set up when the component mounts
    useEffect(() => {
        const handleLoadingGame = (dataIsReady: boolean) => {
            setDataIsReady(dataIsReady);
        };

        SOCKET.on("loadingGame", handleLoadingGame);

        return () => {
            SOCKET.off("loadingGame", handleLoadingGame);
        };
    }, []); // Empty dependency array ensures it runs only on mount

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get<Question[]>(`${BACKEND_URL}/items/category/${selectedCategoryId}`);
                setQuestions(response.data);

                // Ensure the event is emitted only after the listener is set up
                SOCKET.emit("loadingGame", roomId);

                setCountdown(5); // Start the countdown
            } catch (error) {
                console.error("Error fetching questions:", error);
                setDataIsReady(false);
            }
        };

        fetchQuestions();
    }, [selectedCategoryId]);


    // Handle the initial countdown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && secondCountdown === 0 && dataIsReady) {
            startNewQuestion();
        }
    }, [countdown]);

    // Handle the second countdown for answering the question
    useEffect(() => {
        if (secondCountdown > 0) {
            const timer = setTimeout(() => setSecondCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else if (secondCountdown === 0 && currentQuestion) {
            setShowAnswer(true);
            SOCKET.emit("answerQuestion", { roomId: roomId, answer: currentQuestion.name, showAnswer: true });
        }
    }, [secondCountdown]);

    // Start a new question
    const startNewQuestion = () => {
        if (questions.length === 0) {
            setGameEnded(true);
            return;
        }

        const randomIndex = Math.floor(Math.random() * questions.length);
        const newQuestion = questions[randomIndex];

        const newQuestions = questions.filter((_, index) => index !== randomIndex);

        setQuestions(newQuestions);
        setCurrentQuestion(newQuestion);
        setSecondCountdown(5);
        setShowAnswer(false);
        SOCKET.emit("answerQuestion", { roomId: roomId, answer: "", showAnswer: false });
    };

    // Reset the game
    const resetGame = () => {
        setQuestions([]); // Clear questions to trigger a refetch
        setGameEnded(false);
        setCountdown(5);
        setCurrentQuestion(null);
        setShowAnswer(false);
        setSecondCountdown(0);
        setDataIsReady(false); // Reset dataIsReady to false while refetching

        // Refetch questions from the API
        const fetchQuestions = async () => {
            try {
                const response = await axios.get<Question[]>(`${BACKEND_URL}/items/category/${selectedCategoryId}`);
                setQuestions(response.data);
                setDataIsReady(true); // Set dataIsReady to true after data is fetched
            } catch (error) {
                console.error("Error fetching questions:", error);
                setDataIsReady(false); // Ensure dataIsReady remains false if there's an error
            }
        };

        fetchQuestions();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-6">
            {!dataIsReady ? (
                // Show loading bar when data is not ready
                <div className="flex flex-col items-center">
                    {/* Progress Bar */}
                    <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full animate-progress"></div>
                    </div>

                    {/* Loading Text */}
                    <p className="mt-2 text-white-500 font-semibold animate-pulse">
                        Loading...
                    </p>
                </div>
            ) : (
                // When data is ready, check if the game has ended
                gameEnded ? (
                    // Game ended screen
                    <>
                        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
                            🎉 Congratulations! 🎉
                        </h1>
                        <p className="text-xl mb-6 text-gray-200">You've answered all the questions!</p>
                        <button
                            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded-xl transition duration-300"
                            onClick={resetGame}
                        >
                            Restart Game
                        </button>
                    </>
                ) : (
                    // Game is still ongoing
                    <>
                        {countdown > 0 && secondCountdown === 0 && (
                            // Initial countdown before the game starts
                            <div className="flex flex-col items-center">
                                <div className="text-2xl font-semibold mb-4">
                                    The game starts in:
                                </div>
                                <div className="text-9xl font-bold animate-pulse">
                                    {countdown}
                                </div>
                            </div>
                        )}

                        {countdown === 0 && secondCountdown > 0 && !showAnswer && currentQuestion && (
                            // Game is running, show the current question
                            <>
                                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
                                    🏁 The Game Has Started! 🏁
                                </h1>
                                <p className="text-lg mb-6 text-gray-200">Answer the question before time runs out! ⏳</p>
                                <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                                    <h2 className="text-3xl font-bold mb-4 text-indigo-600">Your Question:</h2>
                                    <img
                                        src={currentQuestion.image}
                                        alt="Question Visual"
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <p className="text-lg text-gray-600">{currentQuestion.description}</p>
                                    <div className="text-5xl font-bold mt-6 text-red-500">{secondCountdown}</div>
                                </div>
                            </>
                        )}

                        {showAnswer && secondCountdown === 0 && countdown === 0 && currentQuestion && (
                            // Time's up, show the correct answer
                            <>
                                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
                                    🕒 Time's Up!
                                </h1>
                                <p className="text-xl mb-6 text-gray-200">The correct answer was:</p>
                                <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center">
                                    <h2 className="text-4xl font-bold text-green-600">{currentQuestion.name}</h2>
                                </div>
                                <button
                                    className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-xl transition duration-300"
                                    onClick={startNewQuestion}
                                >
                                    Next Question
                                </button>
                            </>
                        )}
                    </>
                )
            )}
        </div>
    );
};

export default MainGaimingZone;