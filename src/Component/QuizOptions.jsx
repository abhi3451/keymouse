import React from "react";
import styles from "./Question.module.css";
import { useQuizContext } from "../Store/QuizContext";

const QuizOptions = ({
  currentQuestion,
  handleOptionClick,

  nextQuestion,
}) => {
  const { state } = useQuizContext();
  const {
    feedback,

    selectedOption,
    answerSubmitted,
  } = state;
  return (
    <div>
      <div className={styles.options}>
        {currentQuestion?.incorrect_answers
          .concat(currentQuestion.correct_answer)
          .map((option, index) => (
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
