import React, { useEffect } from "react";
import { useQuizContext } from "../Store/QuizContext";
import {
  calculateProgressPercent,
  calculateTopProgressPercent,
} from "../utils/helperFunction";
import styles from "./Question.module.css";
import TopBar from "./TopBar";
import QuesBank from "./MCQScreen";
import QuizOptions from "./QuizOptions";
import Percent from "./Percent";

const QuizShow = ({ quizData }) => {
  const { state, dispatch } = useQuizContext();
  const {
    currentQuestionIndex,
    answerSubmitted,
    totalQuestions,
    correctAnswers,
    answers,
  } = state;

  useEffect(() => {
    if (!quizData || quizData.length === 0) {
      console.error("Quiz data is missing or empty.");
    }
    dispatch({ type: "SET_TOTAL_QUESTIONS", payload: quizData.length });
  }, [quizData, dispatch]);

  const handleOptionClick = (isCorrect, selectedOption) => {
    if (!answerSubmitted) {
      dispatch({
        type: "SELECT_OPTION",
        payload: { isCorrect, selectedOption },
      });
    } else {
      console.warn(
        "Option already submitted. Please wait for the next question."
      );
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      dispatch({ type: "NEXT_QUESTION" });
    } else {
      console.warn("No more questions available.");
    }
  };

  const tryAgain = () => {
    dispatch({ type: "RESET" });
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.quizContainer}>
        <TopBar
          topProgressPercent={calculateTopProgressPercent(
            answers,
            totalQuestions
          )}
        />
        {quizData && quizData.length > 0 ? (
          <>
            <QuesBank currentQuestion={currentQuestion} />
            <QuizOptions
              currentQuestion={currentQuestion}
              handleOptionClick={handleOptionClick}
              tryAgain={tryAgain}
              nextQuestion={nextQuestion}
            />
            <Percent
              nextQuestion={nextQuestion}
              progressPercent={calculateProgressPercent(
                correctAnswers,
                totalQuestions
              )}
            />
          </>
        ) : (
          <div className={styles.error}>No quiz data available.</div>
        )}
      </div>
    </div>
  );
};

export default QuizShow;
