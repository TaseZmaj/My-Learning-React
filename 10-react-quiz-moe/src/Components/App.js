import { useQuiz } from "../contexts/QuizContext.jsx";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishSreen from "./FinishSreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";
import Options from "./Options.js";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question>
              <Options />
            </Question>
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishSreen />}
      </Main>
    </div>
  );
}

export default App;
