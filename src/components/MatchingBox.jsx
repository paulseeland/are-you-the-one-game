import React, { useState } from "react";
import "./MatchingBox.css";

const MatchingBox = ({ malePlayers = [], femalePlayers = [], matches = [], guesses = [], addGuess }) => {
  const [selectedMale, setSelectedMale] = useState("");
  const [selectedFemale, setSelectedFemale] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleGuess = () => {
    console.log('handleGuess called', selectedMale, selectedFemale);
    const isMatch = matches.some(
      (pair) =>
        (pair.male === selectedMale && pair.female === selectedFemale) ||
        (pair.female === selectedMale && pair.male === selectedFemale)
    );

    const guessEntry = {
      male: selectedMale,
      female: selectedFemale,
      correct: isMatch,
    };


    addGuess(guessEntry); // Nutzt die Prop-Funktion aus App.jsx
    setFeedback(isMatch ? "correct" : "wrong");
    setTimeout(() => setFeedback(null), 2000);

    // Optional: Auswahl zurücksetzen
    setSelectedMale("");
    setSelectedFemale("");
  };

  return (
    <div className="matching-box">
      <h2>Matching Box</h2>
      <div className="selectors">
        <select value={selectedMale} onChange={(e) => setSelectedMale(e.target.value)}>
          <option value="">Mann auswählen</option>
          {malePlayers.map((player) => (
            <option key={player} value={player}>{player}</option>
          ))}
        </select>

        <select value={selectedFemale} onChange={(e) => setSelectedFemale(e.target.value)}>
          <option value="">Frau auswählen</option>
          {femalePlayers.map((player) => (
            <option key={player} value={player}>{player}</option>
          ))}
        </select>
      </div>

      <button disabled={!selectedMale || !selectedFemale} onClick={handleGuess}>
        Überprüfen
      </button>

      {feedback === "correct" && <div className="heart-animation">❤️ Richtiger Match!</div>}
      {feedback === "wrong" && <div className="heart-animation broken">💔 Kein Match</div>}

      <h3>Bisherige Versuche</h3>
      <ul>
        {guesses.map((guess, index) => (
          <li key={index}>
            {guess.male} & 💍 {guess.female} – {guess.correct ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingBox;
