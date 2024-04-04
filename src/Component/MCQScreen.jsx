import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Question.module.css";
import { useQuizContext } from "../Store/QuizContext";

const QuesBank = ({ currentQuestion }) => {
  const { state } = useQuizContext();
  const {
    currentQuestionIndex,

    totalQuestions,
  } = state;

  return (
    <div className={styles.questionNumber}>
      <div className={styles.questions}>
        Question {currentQuestionIndex + 1} of {totalQuestions}
        <div className={styles.category}>
          {decodeURIComponent(currentQuestion.category)}
        </div>
        <div className={styles.stars}>
          Difficulty: {renderStars(currentQuestion.difficulty)}
        </div>
      </div>
      <div className={styles.question}>
        {decodeURIComponent(currentQuestion.question)}
      </div>
    </div>
  );
};

export default QuesBank;
const renderStars = (difficulty) => {
  let filledStars = [];

  switch (difficulty) {
    case "easy":
      filledStars = Array(1).fill(<FaStar color="gold" />);
      break;
    case "medium":
      filledStars = Array(2).fill(<FaStar color="gold" />);
      break;
    case "hard":
      filledStars = Array(3).fill(<FaStar color="gold" />);
      break;
    default:
      filledStars = Array(0).fill(<FaStar color="grey" />);
      break;
  }

  const emptyStars = Array(3 - filledStars.length).fill(
    <FaStar color="grey" />
  );

  return filledStars.concat(emptyStars);
};
