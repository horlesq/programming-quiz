export function StartScreen({ numQuestions }) {
    return (
        <div className="start">
            <h2>Welcome to the Progamming Quiz!</h2>
            <h3>{numQuestions} questions to test your programming knowladge</h3>
            <button className="btn-ui">Begin</button>
        </div>
    );
}
