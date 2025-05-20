import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    if (questions && questions[currQues]) {
      setOptions(
        shuffleOptions([
          questions[currQues].correct_answer,
          ...questions[currQues].incorrect_answers,
        ])
      );
    }
  }, [currQues, questions]);

  const shuffleOptions = (options) => {
    return [...options].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <div className="quiz-box">
        {questions ? (
          <Question
            name={name}
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        ) : (
          <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            size={150}
            thickness={1}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
