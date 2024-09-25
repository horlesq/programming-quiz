import { useEffect, useReducer } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { StartScreen } from "./StartScreen";
import { Questions } from "./Questions";
import { NextButton } from "./NextButton";

const initialState = {
    questions: [],
    status: "loading", // 'loading' / 'error' / 'ready' / 'active' / 'finished'
    index: 0,
    answer: null,
    score: 0,
};

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
                        ? state.score + question.pointsscore
                        : state.score,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
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

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(
                    "/.netlify/functions/questions-api"
                ); // Update the URL to the Netlify function
                if (!response.ok) throw new Error("Could not fetch questions");

                const data = await response.json();
                dispach({ type: "dataReceived", payload: data });
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
                        <Questions
                            question={questions[index]}
                            dispach={dispach}
                            answer={answer}
                        />

                        <NextButton dispach={dispach} answer={answer} />
                    </>
                )}
            </Main>
        </div>
    );
}
