import { Options } from "./Options";

export function Questions({ question, dispach, answer }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispach={dispach} answer={answer} />
        </div>
    );
}
