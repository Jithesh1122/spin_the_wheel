import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../page2.css";
import spinner from "../images/wheel.png";  // Your spinner image
import union from "../images/Union.png";   // Your needle image
import spinSound from "../sounds/spinSound.mp3";  // Sound for spinning

const Page2 = () => {
  const history = useHistory();
  const location = useLocation();

  // Retrieve spinsLeft and score from the state, with fallback values
  const spinsLeft = location.state?.spinsLeft ?? 5;  // Default 5 spins if state is undefined
  const score = location.state?.score ?? 0;  // Default score to 0 if undefined

  const topics = [
    "Fundamental Rights",
    "Directive Principles",
    "Preamble",
    "Union and States",
    "Emergency Provisions",
    "Amendments",
  ];

  const audio = new Audio(spinSound);  // Load spin sound

  // Function to start spinning the wheel
  const startRotation = () => {
    audio.play();  // Play the spin sound
    const sectorDecider = Math.floor(Math.random() * topics.length);  // Randomly decide the topic
    const turns = Math.floor(Math.random() * 10 + 1) + 0.16667 * sectorDecider;

    const image = document.getElementById("spinImage");
    image.style.transition = `all 3s`;
    image.style.transform = `rotate(${turns}turn)`;

    // After the rotation animation ends, redirect to quiz page with the selected topic
    setTimeout(() => {
      audio.pause();  // Pause the spin sound
      history.push({
        pathname: "/quiz",
        state: { topic: topics[sectorDecider], spinsLeft: spinsLeft - 1, score },
      });
    }, 3000);
  };

  return (
    <div className="div-wrapper">
      <h2>Spins Left: {spinsLeft}</h2> {/* Display remaining spins */}
      <h3>Score: {score}</h3>  {/* Display current score */}
      <div className="spinWheel">
        <img className="needle" src={union} alt="needle" />
        <img className="spinner" id="spinImage" src={spinner} alt="spinner" />
      </div>
      <div className="btn">
        <button onClick={startRotation} disabled={spinsLeft === 0}>
          {spinsLeft > 0 ? "SPIN" : "No more spins"}
        </button>
      </div>
    </div>
  );
};

export default Page2;
