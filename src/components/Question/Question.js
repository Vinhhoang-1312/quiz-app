import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import he from "he";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  name,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore((prev) => prev + 1);
    setError(false);
  };

  const handleNext = () => {
    if (!selected) {
      setError("Please select an option first");
      return;
    }
    if (currQues === questions.length - 1) {
      localStorage.setItem("total", questions.length.toString());
      localStorage.setItem("name", name);
      history.push("/result");
    } else {
      setCurrQues(currQues + 1);
      setSelected(undefined);
    }
  };

  const handleQuit = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="question">
      <h2>
        Question {currQues + 1}
        <span className="totalCount">/{questions.length}</span> :
      </h2>
      <div className="singleQuestion">
        <h2>{he.decode(questions[currQues].question)}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {he.decode(i)}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={handleQuit}
            className="quit-button"
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues === questions.length - 1 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
