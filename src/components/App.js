import { useEffect, useReducer } from "react";
import { Header } from "./Header";
import { Main } from "./Main";

const initialState = {
    questions: [],
    // 'loading' / 'error' / 'ready' / 'active' / 'finished'
    status: "loading",
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
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [state, dispach] = useReducer(reducer, initialState);

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
        <div className="App">
            <Header />

            <Main>
                <p>1/15</p>
                <p>Question no</p>
            </Main>
        </div>
    );
}
