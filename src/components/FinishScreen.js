export function FinishScreen({ score, maxScore, dispach }) {
    const percentage = (score / maxScore) * 100;

    return (
        <>
            <p className="result">
                You scored <strong>{score}</strong> out of {maxScore} (
                {Math.ceil(percentage)} %)
            </p>
            <button
                className="btn-ui"
                onClick={() => dispach({ type: "reset" })}
            >
                Reset
            </button>
        </>
    );
}
