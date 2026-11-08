import { useRef } from "react";

export default function Answers({
  answers,
  answerState,
  onSelectAnswer,
  selectedAnswer,
}) {
  const shuffledAnswers = useRef();
  shuffledAnswers.current = [...answers];
  shuffledAnswers.current.sort(() => Math.random() - 0.5);
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((ans) => {
        const isSelected = selectedAnswer === ans;
        let answerClass = "";
        if (answerState === "answered" && isSelected) {
          answerClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          answerClass = answerState;
        }
        return (
          <li key={ans} className="answer">
            <button
              className={answerClass}
              onClick={() => onSelectAnswer(ans)}
              disabled={answerState !== ""}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
