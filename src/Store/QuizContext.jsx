import { createContext, useContext } from "react";

export const QuizContext = createContext();

export const useQuizContext = () => {
  return useContext(QuizContext);
};
