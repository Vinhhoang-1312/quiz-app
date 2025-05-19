import axios from "axios";

export const fetchQuestions = async () => {
  const { data } = await axios.get("https://opentdb.com/api.php?amount=5");
  return data.results;
};
