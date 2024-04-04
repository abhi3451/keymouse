import React, { useEffect, useState } from "react";
import styles from "./Question.module.css";
import { useQuizContext } from "../Store/QuizContext";

const QuizOptions = ({ currentQuestion, handleOptionClick, nextQuestion }) => {
  const { state } = useQuizContext();
  const { feedback, selectedOption, answerSubmitted } = state;

  const shuffleOptions = (options) => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (currentQuestion) {
      const options = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setShuffledOptions(shuffleOptions(options));
    }
  }, [currentQuestion]);

  return (
    <div>
      <div className={styles.options}>
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            disabled={answerSubmitted}
            className={`${styles.option} ${
              option === selectedOption ? styles.selected : ""
            }`}
            onClick={() =>
              !answerSubmitted &&
              handleOptionClick(
                option === currentQuestion.correct_answer,
                option
              )
            }
          >
            {decodeURIComponent(option)}
          </button>
        ))}
      </div>
      <div className={styles.feedback}>{feedback}</div>
      <div>
        <button
          className={answerSubmitted ? styles.nextBtn : styles.nextBtnInactive}
          disabled={!selectedOption}
          onClick={nextQuestion}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuizOptions;
