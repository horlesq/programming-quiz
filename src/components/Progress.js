import { useQuiz } from "../contexts/QuizContext";

export function Progress() {
    const { index, numQuestions, score, maxScore, answer } = useQuiz();
    
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={index + Number(answer !== null)}
            ></progress>
            <p>
                Question{" "}
                <strong>
                    {index + 1}/{numQuestions}
                </strong>
            </p>
            <p>
                <strong>
                    {score}/{maxScore}
                </strong>
            </p>
        </header>
    );
}
