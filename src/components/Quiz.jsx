import { useState } from "react";
import Summary from "./Summary";
import QUESTIONS from "../utils/questions";
export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const currentQuestionIndex = answers.length;
  const isQuizCompleted = currentQuestionIndex == QUESTIONS.length;
  if (isQuizCompleted) return <Summary />;
  const shuffledAnswers = [...QUESTIONS[currentQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  const handleSelectAnswer = (answer) => {
    setAnswers((prevState) => {
      return [...prevState, answer];
    });
  };
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((ans) => (
            <li key={ans} className="answer">
              <button onClick={handleSelectAnswer}>{ans}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
