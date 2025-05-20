import { useHistory } from "react-router-dom";
import "./Review.css";
import he from "he";

const Review = () => {
  const history = useHistory();
  const userAnswers = JSON.parse(localStorage.getItem("userAnswers") || "[]");

  if (!userAnswers.length) {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <h2>No review data found.</h2>
        <button onClick={() => history.push("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="review-root">
      <div className="review-container">
        <h2>Review Your Answers</h2>
        {userAnswers.map((ans, idx) => (
          <div className="review-question" key={idx}>
            <div className="review-q">
              <strong>Q{idx + 1}:</strong> {he.decode(ans.question)}
            </div>
            <div className="review-options">
              {ans.options.map((opt, i) => {
                const isCorrect = opt === ans.correct;
                const isSelected = opt === ans.selected;
                return (
                  <div
                    key={i}
                    className={`review-option
                    ${isCorrect ? "correct" : ""}
                    ${isSelected && !isCorrect ? "wrong" : ""}
                  `}
                  >
                    {he.decode(opt)}
                    {isCorrect && <span className="badge">Correct</span>}
                    {isSelected && !isCorrect && (
                      <span className="badge wrong">Your Answer</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button className="review-btn" onClick={() => history.push("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Review;
