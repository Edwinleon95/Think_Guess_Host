import { useGlobalStore } from "../store";

export const QuestionsCount = () => {
    const { questionsLength, questionNumber } = useGlobalStore();
    return (
        <>
            <p className="text-sm text-white font-semibold mt-4 px-4 py-2 bg-white/10 rounded-full">
                Question {questionNumber} of {questionsLength}
            </p>
        </>
    )
};