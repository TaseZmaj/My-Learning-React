import { useEffect, useReducer } from "react";
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

const SECS_PER_QUESTION = 30; //DOBRA PRAKTIKA

const initialState = {
  questions: [],
  //namesto isLoading state da napravis mozes vaka - po dinamicki e
  status: "loading", //"loading", "error", "ready", "active", "finished"
  index: 0, //ova pokazuva koe prashanje e momentalno prikazano na ekranot
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null, //10 seconds na pr
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
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        //Ovaa points kalkulacija mozes da ja pravis i vo <Options />
        //(it goes against the logic of useReducer though),
        //podobro e da ja pravis vo samiot useReducer
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // return {
      //   ...state,
      //   status: "ready",
      //   answer: null,
      //   index: 0,
      //   points: 0,
      // };
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        //ako timerot e na 0 sekundi, smeni go statusot vo finished, inaku si ostanuva
        //kakov shto e momentalno
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          //samata dispatch funkcija ja stavash kako prop i VO komponentot ja sreduvash
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishSreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            index={index}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
