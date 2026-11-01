import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";
import QUESTIONS from "../utils/questions";
const QUESTION_TIME_LIMIT = 15000;
export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [answersState, setAnswersState] = useState("");
  const currentQuestionIndex =
    answersState === "" ? answers.length : answers.length - 1;
  const isQuizCompleted = currentQuestionIndex == QUESTIONS.length;
  console.log(isQuizCompleted);
  const handleSelectAnswer = useCallback((answer) => {
    setAnswersState("answered");
    setAnswers((prevState) => {
      return [...prevState, answer];
    });
    setTimeout(() => {
      if (answer == QUESTIONS[currentQuestionIndex].answers[0]) {
        setAnswersState("correct");
      }else{
        setAnswersState("wrong");
      }
      setTimeout(() => {
        setAnswersState("");
      }, 2000)
    },1000)
  }, []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );
  if (isQuizCompleted) return <Summary />;
  const shuffledAnswers = [...QUESTIONS[currentQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestionIndex}
          timeout={QUESTION_TIME_LIMIT}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((ans) => {
            const isSelected = answers[answers.length - 1] === ans;
            let answerClass = "";
            if (answersState === "answered" && isSelected) {
              answerClass = "selected";
            }else if (answersState === ("correct"|| "wrong") && isSelected) {
              answerClass = answersState;
            }
            return (
              <li key={ans} className="answer">
                <button className={answerClass} onClick={() => handleSelectAnswer(ans)}>{ans}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
