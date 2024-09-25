export function NextButton({ dispach, answer }) {
    if (answer === null) return null;
    return (
        <button
            className="btn-ui"
            onClick={() => dispach({ type: "nextQuestion" })}
        >
            Next
        </button>
    );
}
