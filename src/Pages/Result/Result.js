import { Button } from "@material-ui/core";
import { useEffect } from "react";
import "./Result.css";
import { useHistory } from "react-router-dom";

const Result = () => {
  const history = useHistory();

  const name = localStorage.getItem("name");
  const score = parseInt(localStorage.getItem("score"), 10);
  const total = parseInt(localStorage.getItem("total"), 10);
  const startTime = parseInt(localStorage.getItem("startTime"), 10);
  const endTime = Date.now();
  const duration = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

  useEffect(() => {
    if (!name || isNaN(score) || isNaN(total)) {
      history.push("/");
    }
  }, [name, score, total, history]);

  const handleQuit = () => {
    localStorage.clear();
    history.push("/");
  };

  const isPass = score > total / 2;

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-info">
          <h2>
            Final Score: <span className="score">{score}</span>
          </h2>
          <p className={`message ${isPass ? "happy" : "sad"}`}>
            {isPass ? "Great job" : "Better luck next time"},{" "}
            <strong>{name}</strong>! Bạn đã trả lời đúng{" "}
            <strong>
              {score}/{total}
            </strong>{" "}
            câu trong <strong>{duration}</strong> giây.
          </p>
        </div>
        <div className="result-image">
          <img
            src={isPass ? "/happy.png" : "/sad.png"}
            alt={isPass ? "happy" : "sad"}
          />
        </div>
        <div className="result-actions">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleQuit}
            className="home-button"
          >
            Go to homepage
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: 12 }}
            onClick={() => history.push("/review")}
          >
            Review Answers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
