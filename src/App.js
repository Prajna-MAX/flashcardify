import React, { useEffect, useState, useRef } from "react";
import Flashcardlist from "./FlashcardList";
import axios from "axios";
import './Flasscard.css'

function App() {
  const [categories, setCategories] = useState([]);
  const [Flashcard, setFlashcard] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcard(
          res.data.results.map((questionItem, index) => {
            const answer = questionItem.correct_answer;
            const options = [
              ...questionItem.incorrect_answers.map((option) => {
                return decodeString(option);
              }),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
        console.log(res);
      });
  };

  return (
    <div>
      <form className="header" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Select a category:</label>
          <select id="category" ref={categoryEl}>
            <option value="">Any Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of question:</label>
          <input
            type="number"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

      <Flashcardlist flashcards={Flashcard} />
    </div>
  );
}

export default App;

const SAMPLE = [
  {
    id: 1,
    question: "what?",
    answer: "2",
    options: ["2", "3", "4", "5"],
  },
];
