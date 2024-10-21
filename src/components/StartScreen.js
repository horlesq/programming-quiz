import { useQuiz } from "../contexts/QuizContext";

export function StartScreen() {
    const { numQuestions, dispatch } = useQuiz();

    return (
        <div className="start">
            <h2>Welcome to the Progamming Quiz!</h2>
            <h3>{numQuestions} questions to test your programming knowladge</h3>
            <button
                className="btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                Start
            </button>
        </div>
    );
}
