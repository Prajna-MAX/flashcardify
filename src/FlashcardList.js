import React from "react";
import Flashcard from "./Flashcard";
import "./Flasscard.css";

export default function FlashcardList({ flashcards }) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}
