import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../quiz.css";

const quizQuestions = {
  "Fundamental Rights": {
    question: "How many fundamental rights are there in the Indian Constitution?",
    options: ["4", "6", "8", "10"],
    answer: "6",
  },
  "Directive Principles": {
    question: "Directive Principles are inspired from the constitution of which country?",
    options: ["USA", "Canada", "Ireland", "France"],
    answer: "Ireland",
  },
  "Preamble": {
    question: "What does the Preamble to the Indian Constitution begin with?",
    options: ["We the People", "Liberty", "Justice", "Equality"],
    answer: "We the People",
  },
  "Union and States": {
    question: "Which part of the Constitution deals with Union and States?",
    options: ["Part III", "Part V", "Part VI", "Part XI"],
    answer: "Part XI",
  },
  "Emergency Provisions": {
    question: "How many types of emergencies are there in the Constitution?",
    options: ["1", "2", "3", "4"],
    answer: "3",
  },
  "Amendments": {
    question: "Which article provides for amendments to the Constitution?",
    options: ["Article 356", "Article 368", "Article 370", "Article 371"],
    answer: "Article 368",
  },
};

const Quiz = () => {
  const location = useLocation();
  const history = useHistory();
  const { topic, spinsLeft, score } = location.state;  // Retrieve state from location

  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!selectedOption) {
      setError("Please select an option!");
      return;
    }

    const correctAnswer = quizQuestions[topic].answer;
    const updatedScore = selectedOption === correctAnswer ? score + 1 : score;

    if (spinsLeft - 1 === 0) {
      // Redirect to result page if no spins are left
      history.push({
        pathname: "/result",
        state: { finalScore: updatedScore },
      });
    } else {
      // Redirect back to the wheel for the next spin
      history.push({
        pathname: "/page2",
        state: { spinsLeft: spinsLeft - 1, score: updatedScore },
      });
    }
  };

  return (
    <div className="quiz-wrapper">
      <h2>Topic: {topic}</h2>
      <h3>{quizQuestions[topic].question}</h3>
      <div className="options">
        {quizQuestions[topic].options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={option}
              name="option"
              value={option}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Quiz;
