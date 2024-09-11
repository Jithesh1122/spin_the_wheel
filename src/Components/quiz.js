import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../quiz.css";

// Pool of questions for each topic
const quizQuestions = {
  "Fundamental Rights": [
    { question: "How many fundamental rights are there in the Indian Constitution?", options: ["4", "6", "8", "10"], answer: "6" },
    { question: "Which fundamental right is abolished by the 44th Amendment?", options: ["Right to Property", "Right to Equality", "Right to Freedom", "Right to Education"], answer: "Right to Property" },
    { question: "Which article deals with Right to Equality?", options: ["Article 14", "Article 19", "Article 21", "Article 23"], answer: "Article 14" },
    // Add more questions for Fundamental Rights...
  ],
  "Directive Principles": [
    { question: "Directive Principles are inspired from the constitution of which country?", options: ["USA", "Canada", "Ireland", "France"], answer: "Ireland" },
    { question: "Which part of the Indian Constitution contains the Directive Principles of State Policy?", options: ["Part IV", "Part II", "Part VI", "Part VIII"], answer: "Part IV" },
    { question: "Which article describes the promotion of international peace and security?", options: ["Article 51", "Article 31", "Article 21", "Article 25"], answer: "Article 51" },
    // Add more questions for Directive Principles...
  ],
  "Preamble": [
    { question: "What does the Preamble to the Indian Constitution begin with?", options: ["We the People", "Liberty", "Justice", "Equality"], answer: "We the People" },
    { question: "How many words are in the Preamble?", options: ["72", "85", "88", "92"], answer: "85" },
    { question: "Which of the following was added by the 42nd Amendment to the Preamble?", options: ["Secular", "Sovereign", "Democratic", "Republic"], answer: "Secular" },
    // Add more questions for Preamble...
  ],
  "Union and States": [
    { question: "Which part of the Constitution deals with Union and States?", options: ["Part III", "Part V", "Part VI", "Part XI"], answer: "Part XI" },
    { question: "Who is the constitutional head of the Union?", options: ["President", "Prime Minister", "Governor", "Chief Justice"], answer: "President" },
    { question: "Which Article deals with the formation of new states?", options: ["Article 3", "Article 5", "Article 10", "Article 15"], answer: "Article 3" },
    // Add more questions for Union and States...
  ],
  "Emergency Provisions": [
    { question: "How many types of emergencies are there in the Constitution?", options: ["1", "2", "3", "4"], answer: "3" },
    { question: "Which article deals with National Emergency?", options: ["Article 352", "Article 356", "Article 365", "Article 370"], answer: "Article 352" },
    { question: "How long can President's Rule be imposed in a state?", options: ["6 months", "1 year", "2 years", "Indefinite"], answer: "6 months" },
    // Add more questions for Emergency Provisions...
  ],
  "Amendments": [
    { question: "Which article provides for amendments to the Constitution?", options: ["Article 356", "Article 368", "Article 370", "Article 371"], answer: "Article 368" },
    { question: "Which amendment is known as the 'Mini-Constitution'?", options: ["42nd", "44th", "52nd", "74th"], answer: "42nd" },
    { question: "Which was the first amendment made to the Constitution?", options: ["1st", "2nd", "3rd", "4th"], answer: "1st" },
    // Add more questions for Amendments...
  ],
};

const Quiz = () => {
  const location = useLocation();
  const history = useHistory();
  const { topic, spinsLeft, score } = location.state;  // Retrieve state from location

  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    // Randomly select a question from the pool for the current topic
    const randomQuestion = quizQuestions[topic][Math.floor(Math.random() * quizQuestions[topic].length)];
    setCurrentQuestion(randomQuestion);
  }, [topic]);

  const handleSubmit = () => {
    if (!selectedOption) {
      setError("Please select an option!");
      return;
    }

    const correctAnswer = currentQuestion.answer;
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
        pathname: "/",
        state: { spinsLeft: spinsLeft - 1, score: updatedScore },
      });
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>; // In case the question is not yet selected
  }

  return (
    <div className="quiz-wrapper">
      <h2>Topic: {topic}</h2>
      <h3>{currentQuestion.question}</h3>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
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
