import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../utils/questions.js";

export default function Question({
  index,
  onSkipAnswer,
  onSelectAnswer,
  timeout,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  const handleSelectAnswer = (newAnswer) => {
    setAnswer({
      selectedAnswer: newAnswer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: newAnswer,
        isCorrect: newAnswer === QUESTIONS[index].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(newAnswer);
      }, 2000);
    }, 1000);
  };
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) answerState = "answered";
  return (
    <div id="question">
      <QuestionTimer timeout={timeout} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
