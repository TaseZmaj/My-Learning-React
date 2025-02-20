import { useQuiz } from "../contexts/QuizContext";

function Question({ children }) {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      {children}
    </div>
  );
}

export default Question;
