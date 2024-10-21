import { useQuiz } from "../contexts/QuizContext";

export function Options({ question }) {
    const { dispatch, answer } = useQuiz();
    const isAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${
                        index === answer ? "answer" : ""
                    } ${
                        isAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    key={option}
                    disabled={isAnswered}
                    onClick={() =>
                        dispatch({ type: "newAnswer", payload: index })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
