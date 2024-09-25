import { useEffect, useReducer } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { StartScreen } from "./StartScreen";
import { Questions } from "./Questions";
import { NextButton } from "./NextButton";
import { Progress } from "./Progress";
import { FinishScreen } from "./FinishScreen";

const initialState = {
    questions: [],
    status: "loading", // 'loading' / 'error' / 'ready' / 'active' / 'finished'
    index: 0,
    answer: null,
    score: 0,
};

function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        case "start":
            return { ...state, status: "active" };
        case "newAnswer":
            const question = state.questions[state.index];

            return {
                ...state,
                answer: action.payload,
                score:
                    action.payload === question.correctOption
                        ? state.score + question.points
                        : state.score,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return { ...state, status: "finish" };
        case "reset":
            return {
                ...state,
                questions: shuffleArray(state.questions), // Shuffle the questions on reset
                index: 0,
                answer: null,
                score: 0,
                status: "ready",
            };
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [{ questions, status, index, answer, score }, dispach] = useReducer(
        reducer,
        initialState
    );
    const numQuestions = questions.length;
    const maxScore = questions.reduce((prev, cur) => prev + cur.points, 0);
    console.log(score);
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(
                    "/.netlify/functions/questions-api"
                ); // Update the URL to the Netlify function
                if (!response.ok) throw new Error("Could not fetch questions");

                const data = await response.json();
                const shuffledQuestions = shuffleArray(data); // Shuffle the questions
                dispach({ type: "dataReceived", payload: shuffledQuestions });
            } catch (error) {
                dispach({ type: "dataFailed" });
                console.error("Error fetching questions:", error);
            }
        }

        fetchQuestions();
    }, []);

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispach={dispach}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            score={score}
                            maxScore={maxScore}
                            answer={answer}
                        />
                        <Questions
                            question={questions[index]}
                            dispach={dispach}
                            answer={answer}
                        />

                        <NextButton
                            dispach={dispach}
                            answer={answer}
                            index={index}
                            numQuestions={numQuestions}
                        />
                    </>
                )}
                {status === "finish" && (
                    <FinishScreen
                        score={score}
                        maxScore={maxScore}
                        dispach={dispach}
                    />
                )}
            </Main>
        </div>
    );
}
