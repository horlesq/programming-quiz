export function NextButton({ dispach, answer, index, numQuestions }) {
    if (answer === null) return null;

    if (index < numQuestions - 1)
        return (
            <button
                className="btn-ui"
                onClick={() => dispach({ type: "nextQuestion" })}
            >
                Next
            </button>
        );

    if (index === numQuestions - 1)
        return (
            <button
                className="btn-ui"
                onClick={() => dispach({ type: "finish" })}
            >
                Finish
            </button>
        );
}
