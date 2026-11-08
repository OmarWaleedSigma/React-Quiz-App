import { useCallback, useState, useRef } from "react";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";
import QUESTIONS from "../utils/questions";
import Answers from "./Answers";
const QUESTION_TIME_LIMIT = 15000;
export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const currentQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;
  const isQuizCompleted = currentQuestionIndex == QUESTIONS.length;
  console.log(isQuizCompleted);
  const handleSelectAnswer = useCallback((answer) => {
    setAnswerState("answered");
    setAnswers((prevState) => {
      return [...prevState, answer];
    });
    setTimeout(() => {
      if (answer == QUESTIONS[currentQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
  }, []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );
  if (isQuizCompleted) return <Summary />;
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestionIndex}
          timeout={QUESTION_TIME_LIMIT}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
        <Answers
          answers={QUESTIONS[currentQuestionIndex].answers}
          answerState={answerState}
        />
      </div>
    </div>
  );
}
