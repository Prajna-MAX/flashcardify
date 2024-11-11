import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Flasscard.css";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const [selectedOption, setSelectedOption] = useState(null);
  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 200));
  }

  function checkAnswer(option) {
    if (option === flashcard.answer) {
      return true;
    } else {
      return false;
    }
  }
  function wrongAnswer() {
    setFlip(!flip);
    setTimeout(() => {
      setFlip(!flip);
      // Flip the card back after the alert is closed
    }, 1000);
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  });

  return (
    <div className="card-container ">
      <div className={`card ${flip ? "flip" : ""}`} style={{ height: height }}>
        <div className="front " ref={frontEl}>
          <h5 className="question">{flashcard.question}</h5>

          <div className="options">
  {flashcard.options.map((option) => {
    const isCorrect = checkAnswer(option);
    return (
      <button
        className={`option ${
          selectedOption === option
            ? isCorrect
              ? "correct"
              : "incorrect"
            : ""
        }`}
        key={option}
        onClick={() => {
          setSelectedOption(option);
          if (!isCorrect) {
            wrongAnswer();
          }
        }}
      >
        {option}
      </button>
    );
  })}
</div>

        </div>

        <div className="back" ref={backEl}>
          <h5 className="question">{flashcard.question}</h5>
          <div className="answer">Answer: {flashcard.answer}</div>
        </div>
      </div>
    </div>
  );
}
