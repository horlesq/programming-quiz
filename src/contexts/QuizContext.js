const { createContext, useReducer, useEffect, useContext } = require("react");

const QuizContext = createContext();

const SECS_PER_QUESTION = 15;

const initialState = {
    questions: [],
    status: "loading", // 'loading' / 'error' / 'ready' / 'active' / 'finished'
    index: 0,
    answer: null,
    score: 0,
    highscore: 0,
    secondsRemaining: null,
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
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
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
                secondsRemaining: 10,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finish" : state.status,
            };
        default:
            throw new Error("Action unknown");
    }
}

function QuizProvider({ children }) {
    const [
        {
            questions,
            status,
            index,
            answer,
            score,
            highscore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxScore = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(
                    "/.netlify/functions/questions-api"
                ); // Update the URL to the Netlify function
                if (!response.ok) throw new Error("Could not fetch questions");

                const data = await response.json();
                const shuffledQuestions = shuffleArray(data); // Shuffle the questions
                dispatch({ type: "dataReceived", payload: shuffledQuestions });
            } catch (error) {
                dispatch({ type: "dataFailed" });
                console.error("Error fetching questions:", error);
            }
        }

        fetchQuestions();
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                score,
                highscore,
                secondsRemaining,
                numQuestions,
                maxScore,

                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("QuizContext was used outside of the QuizProvider");
    return context;
}

export { QuizProvider, useQuiz };
