import React from "react";

const PlayerInput = ({ malePlayers, femalePlayers, onAddPlayer }) => {
  return (
    <div className="player-input">
      <h2>Spieler hinzufügen</h2>
      <button onClick={() => onAddPlayer("male")}>Männlichen Spieler hinzufügen</button>
      <button onClick={() => onAddPlayer("female")}>Weiblichen Spieler hinzufügen</button>
      <div>
        <p><strong>Männer:</strong> {malePlayers.join(", ")}</p>
        <p><strong>Frauen:</strong> {femalePlayers.join(", ")}</p>
      </div>
    </div>
  );
};

export default PlayerInput;
