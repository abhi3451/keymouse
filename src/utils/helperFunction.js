export const calculateProgressPercent = (correctAnswers, totalQuestions) => {
  return (correctAnswers / totalQuestions) * 100;
};

export const calculateTopProgressPercent = (answers, totalQuestions) => {
  return ((answers + 1) / totalQuestions) * 100;
};
