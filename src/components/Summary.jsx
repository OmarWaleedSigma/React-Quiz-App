import quizCompleted from "../assets/quiz-complete.png";
export default function Summary() {
  return (
    <div id="summary">
        <img src={quizCompleted} alt="Quiz Completed" />
        <h2>Quiz Completed...</h2>
    </div>
  )
}