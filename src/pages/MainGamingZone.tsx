import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalStore } from "../store";
import { SOCKET } from "../services/socket";
import { useNavigate } from "react-router-dom";
import { Question } from "../types/question.interface";
import TimesUpScreen from "../components/TimesUpScreen";
import QuestionsScreen from "../components/QuestionsScreen";
import { LoadingBar } from "../components/LoadingBar";
import { FinishGameScreen } from "../components/FinishGameScreen";
import { Countdown } from "../components/Countdown";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MainGamingZone: React.FC = () => {
    const [dataIsReady, setDataIsReady] = useState<boolean>(false); // Set initial state to false
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

    const {
        selectedCategoryId,
        roomId,
        currentQuestion,
        setCurrentQuestion,
        setAnswers,
        setLoading,
        secondCountdown,
        setSecondCountdown,
        countdown,
        setCountdown
    } = useGlobalStore();

    const navigate = useNavigate();


    useEffect(() => {
        const enterFullScreen = async () => {
            try {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                }
            } catch (error) {
                console.error("Failed to enter fullscreen:", error);
            }
        };

        enterFullScreen();

        // Exit full-screen mode when the component unmounts
        return () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        };
    }, []);
    // Ensure the socket listener is always set up when the component mounts
    useEffect(() => {
        SOCKET.on("loadingGame", (dataIsReady: boolean) => {
            setDataIsReady(dataIsReady);
        });

        SOCKET.on("finishGame", (finishGame: boolean) => {
            if (finishGame) {
                //TODO: Implement the logic to clear the state
                // clearState();
                navigate("/");
            }
        })

        return () => {
            SOCKET.off("loadingGame");
            SOCKET.off("finishGame");
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
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && secondCountdown === 0 && dataIsReady) {
            SOCKET.emit("startPlayersGame", roomId);
            startNewQuestion();
        }
    }, [countdown]);

    // Handle the second countdown for answering the question
    useEffect(() => {
        if (secondCountdown > 0) {
            const timer = setTimeout(() => setSecondCountdown(secondCountdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (secondCountdown === 0 && currentQuestion) {
            setShowAnswer(true);
            SOCKET.emit("answerQuestion", { roomId: roomId, answer: currentQuestion.name, showAnswer: true });
            const fetchAnswers = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get<[]>(`${BACKEND_URL}/answers/${roomId}/${currentQuestion.id}`);
                    setAnswers(response.data);
                } catch (error) {
                    console.error("Error fetching answers:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAnswers();
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
        SOCKET.emit("currentQuestion", { roomId: roomId, idQuestion: newQuestion.id });
        setSecondCountdown(60);
        setShowAnswer(false);
        SOCKET.emit("answerQuestion", { roomId: roomId, answer: "", showAnswer: false });
    };

    // Reset the game
    const resetGame = () => {
        SOCKET.emit("finishGame", roomId);
    };

    return (
        <>
            {!dataIsReady ? (
                // Show loading bar when data is not ready
                <LoadingBar />
            ) : (
                // When data is ready, check if the game has ended
                gameEnded ? (
                    // Game ended screen
                    <FinishGameScreen resetGame={resetGame} />
                ) : (
                    // Game is still ongoing
                    <>
                        {countdown > 0 && secondCountdown === 0 && (
                            // Initial countdown before the game starts
                            <Countdown />
                        )}
                        {countdown === 0 && secondCountdown > 0 && !showAnswer && currentQuestion && (
                            // Game is running, show the current question
                            <QuestionsScreen />
                        )}
                        {showAnswer && secondCountdown === 0 && countdown === 0 && currentQuestion && (
                            // Time's up, show the correct answer
                            <TimesUpScreen startNewQuestion={startNewQuestion} />
                        )}
                    </>
                )
            )}
        </>
    );
};

export default MainGamingZone;