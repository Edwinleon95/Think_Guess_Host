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
import { RevealAudio } from "../assets/RevealAudio";
import { RunningAudio } from "../assets/RunningAudio";
import { Answer } from "../types/answer.interface";
import { QRCode } from "../components/QRCode";
import { Ranking } from "../types/ranking.interface";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MainGamingZone: React.FC = () => {
    const navigate = useNavigate();
    const [dataIsReady, setDataIsReady] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);
    const [secondCountdown, setSecondCountdown] = useState<number>(0);
    const [answerLeft, setAnswerLeft] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [ranking, setRanking] = useState<Ranking[]>([]);

    const {
        selectedCategoryId,
        roomId,
        setQuestionsLength,
        setQuestionNumber,
        questionsLength
    } = useGlobalStore();

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

        SOCKET.on("finishCurrentQuestion", (finishCurrentQuestion: boolean) => {
            if (finishCurrentQuestion) {
                setSecondCountdown(0);
            }
        });

        SOCKET.on("answerLeft", (answerLeft: number) => {
            setAnswerLeft(answerLeft);
        });

        SOCKET.on("showAnswer", (showAnswer: boolean) => {
            setShowAnswer(showAnswer);
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
            SOCKET.off("showAnswer");
        };
    }, []); // Empty dependency array ensures it runs only on mount

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get<Question[]>(`${BACKEND_URL}/items/category/${selectedCategoryId}`);
                setQuestions(response.data);
                setQuestionsLength(response.data.length);
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
            SOCKET.emit("showAnswer", { roomId, showAnswer: true });
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

    const getRanking = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Ranking[]>(`${BACKEND_URL}/answers/ranking/${roomId}`);
            console.log("Ranking data:", response.data);
            setRanking(response.data);
        } catch (error) {
            console.error("Error fetching ranking data:", error);
            toast.error("Error fetching ranking data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Start a new question
    const startNewQuestion = () => {
        if (questions.length === 0) {
            getRanking();
            setGameEnded(true);
            return;
        }

        const randomIndex = Math.floor(Math.random() * questions.length);
        const newQuestion = questions[randomIndex];
        const remainingQuestions = questions.filter((_, index) => index !== randomIndex);

        setQuestions(remainingQuestions);
        setQuestionNumber(questionsLength - remainingQuestions.length);
        setCurrentQuestion(newQuestion);

        SOCKET.emit("currentQuestion", { roomId, idQuestion: newQuestion.id });
        SOCKET.emit("showAnswer", { roomId, showAnswer: false });

        setSecondCountdown(60);
        setAnswerLeft(null);
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
                    <FinishGameScreen
                        resetGame={resetGame}
                        ranking={ranking}
                        loading={loading} />
                ) : (
                    // Game is still ongoing
                    <>
                        {countdown > 0 && secondCountdown === 0 && (
                            // Initial countdown before the game starts
                            <Countdown countdown={countdown} />
                        )}
                        {countdown === 0 && secondCountdown > 0 && !showAnswer && currentQuestion && (
                            // Game is running, show the current question
                            <>
                                <QuestionsScreen
                                    currentQuestion={currentQuestion}
                                    secondCountdown={secondCountdown}
                                    setSecondCountdown={setSecondCountdown}
                                    answerLeft={answerLeft}
                                />
                                <QRCode roomId={roomId} />
                                <RunningAudio
                                    playWhen={true} // Will play automatically when this block renders
                                    src="/RuningQuestion.mp3"
                                />
                            </>
                        )}
                        {showAnswer && secondCountdown === 0 && countdown === 0 && currentQuestion && (
                            <>
                                <TimesUpScreen
                                    startNewQuestion={startNewQuestion}
                                    currentQuestion={currentQuestion}
                                    loading={loading}
                                    answers={answers}
                                    questions={questions}
                                />
                                <QRCode roomId={roomId} />
                                <RevealAudio
                                    playWhen={true} // Will play automatically when this block renders
                                    src="/RevealQuestion.mp3"
                                />
                            </>
                        )}
                    </>
                )
            )}
        </>
    );
};

export default MainGamingZone;