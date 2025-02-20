/* eslint-disable no-unused-vars */
import {
  createContext,
  useContext,
  Context,
  useReducer,
  useEffect,
} from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

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

function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch, //bidejki ne rabotis so nikakva forma na asynchronous code
        //nemas potreba da pishesh event-handlers i mozes samo vaka direktno
        //da go turis dispatch kako context
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
