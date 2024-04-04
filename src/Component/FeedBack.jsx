import React, { useContext } from "react";
import { QuizContext } from "../Store/QuizContext";


const Feedback = () => {
  const { state } = useContext(QuizContext);
  const { feedback } = state;

  return <div className="feedback">{feedback}</div>;
};

export default Feedback;
