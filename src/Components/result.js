import React from "react";
import Confetti from "react-confetti";
import { useLocation } from "react-router-dom";
import "../result.css";

const Result = () => {
  const location = useLocation();
  const { finalScore } = location.state;

  return (
    <div className="result-container">
      {finalScore === 5 ? (
        <>
          <h1 className="marvelous">Marvelous!</h1>
          <Confetti />
        </>
      ) : (
        <h1 className="score">Your Score: {finalScore}/5</h1>
      )}
    </div>
  );
};

export default Result;
