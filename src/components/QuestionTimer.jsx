import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    const timeoutId = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onTimeout, timeout]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevState) => prevState - 100);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
