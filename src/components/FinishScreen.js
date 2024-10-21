import { useQuiz } from "../contexts/QuizContext";

export function FinishScreen() {
    const { score, maxScore, dispatch } = useQuiz();
    const percentage = (score / maxScore) * 100;

    return (
        <>
            <p className="result">
                You scored <strong>{score}</strong> out of {maxScore} (
                {Math.ceil(percentage)} %)
            </p>
            <button
                className="btn-ui"
                onClick={() => dispatch({ type: "reset" })}
            >
                Reset
            </button>
        </>
    );
}
