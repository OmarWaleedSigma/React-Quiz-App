import { useCallback, useState} from "react";
import Summary from "./Summary";
import QUESTIONS from "../utils/questions";
import Question from "./Question";
const QUESTION_TIME_LIMIT = 15000;
export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const currentQuestionIndex = answers.length;
  const isQuizCompleted = currentQuestionIndex == QUESTIONS.length;
  console.log(isQuizCompleted);
  const handleSelectAnswer = useCallback((answer) => {
    setAnswers((prevState) => {
      return [...prevState, answer];
    });
  }, []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );
  if (isQuizCompleted) return <Summary />;
  return (
    <div id="quiz">
      <Question
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        timeout={QUESTION_TIME_LIMIT}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
