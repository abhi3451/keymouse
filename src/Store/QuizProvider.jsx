// QuizContext.js
import React, { useContext, useReducer, useEffect } from "react";
import { QuizContext } from "./QuizContext";

const initialState = {
  currentQuestionIndex: 0,
  feedback: "",
  showNextButton: false,
  selectedOption: null,
  answerSubmitted: false,
  correctAnswers: 0,
  answers: 0,
  totalQuestions: 0,
  progressPercent: 0,
  topProgressPercent: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...state, ...action.payload };
    case "SELECT_OPTION":
      const { isCorrect, selectedOption } = action.payload;
      return {
        ...state,
        selectedOption,
        answerSubmitted: true,
        feedback: isCorrect ? "Correct" : "Sorry. Please try again.",
        showNextButton: true,
        correctAnswers: isCorrect
          ? state.correctAnswers + 1
          : state.correctAnswers,
        answers: state.answers + 1,
        progressPercent: isCorrect
          ? ((state.correctAnswers + 1) / state.totalQuestions) * 100
          : state.progressPercent,
      };
    case "NEXT_QUESTION":
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      return {
        ...state,
        currentQuestionIndex: nextQuestionIndex,
        showNextButton: false,
        feedback: "",
        answerSubmitted: false,
        selectedOption: null,
        topProgressPercent: ((state.answers + 1) / state.totalQuestions) * 100,
      };
    case "SET_TOTAL_QUESTIONS":
      return { ...state, totalQuestions: action.payload };
    case "SET_FEEDBACK":
      return { ...state, feedback: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedCurrentQuestionIndex = sessionStorage.getItem(
      "currentQuestionIndex"
    );
    const storedCorrectAnswers = sessionStorage.getItem("correctAnswers");
    const storedAnswers = sessionStorage.getItem("answers");

    if (storedCurrentQuestionIndex !== null) {
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: { currentQuestionIndex: parseInt(storedCurrentQuestionIndex) },
      });
    }
    if (storedCorrectAnswers !== null) {
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: { correctAnswers: parseInt(storedCorrectAnswers) },
      });
    }
    if (storedAnswers !== null) {
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: { answers: parseInt(storedAnswers) },
      });
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentQuestionIndex", state.currentQuestionIndex);
    sessionStorage.setItem("correctAnswers", state.correctAnswers);
    sessionStorage.setItem("answers", state.answers);
  }, [state]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
