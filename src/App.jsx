import QuizShow from "./Component/QuestionCard";
import { data } from "./questions";

function App() {
  return (
    <div>
      <QuizShow quizData={data} />
    </div>
  );
}

export default App;
