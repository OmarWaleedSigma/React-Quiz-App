import { useRef } from "react";

export default function Answers({answers, answerState, onSelectAnswer, selectedAnswer}) {
  const shuffledAnswers = useRef([]);
  shuffledAnswers.current = [...answers];
  shuffledAnswers.current.sort(() => Math.random() - 0.5);
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((ans) => {
        const isSelected = answers[answers.length - 1] === ans;
        let answerClass = "";
        if (answerState === "answered" && isSelected) {
          answerClass = "selected";
        } else if (answerState === ("correct" || "wrong") && isSelected) {
          answerClass = answerState;
        }
        return (
          <li key={ans} className="answer">
            <button
              className={answerClass}
              onClick={() => onSelectAnswer(ans)}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
