import { Header } from "./Header";
import { Main } from "./Main";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { StartScreen } from "./StartScreen";
import { Questions } from "./Questions";
import { NextButton } from "./NextButton";
import { Progress } from "./Progress";
import { FinishScreen } from "./FinishScreen";
import { Timer } from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
    const { status } = useQuiz();

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen/>
                )}
                {status === "active" && (
                    <>
                        <Progress/>
                        <Questions/>
                        <footer>
                            <Timer/>
                            <NextButton/>
                        </footer>
                    </>
                )}
                {status === "finish" && (
                    <FinishScreen/>
                )}
            </Main>
        </div>
    );
}
