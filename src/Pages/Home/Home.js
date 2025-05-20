import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/api";
import "./Home.css";

const Home = ({ name, setName, fetchQuestions, setScore }) => {
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    if (!name) {
      setError(true);
      return;
    } else {
      setError(false);
      setScore(0);
      localStorage.setItem("score", "0");
      localStorage.setItem("startTime", Date.now().toString());
      fetchQuestions();
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <div className="settings-box">
          <div className="banner-container">
            <img src="/hello.png" className="banner" alt="quiz app" />
          </div>
          <div className="settings__select">
            {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
            <TextField
              style={{ marginBottom: 25, backgroundColor: "white" }}
              label="Enter Your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
