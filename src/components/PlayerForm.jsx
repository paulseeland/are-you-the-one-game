import React, { useState } from 'react';

export default function PlayerForm({ players, addPlayer, startGame }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');

  const handleAdd = () => {
    if (name.trim()) {
      addPlayer(name.trim(), gender);
      setName('');
    }
  };

  const ready = players.filter(p => p.gender === 'male').length === players.filter(p => p.gender === 'female').length && players.length >= 4;

  return (
    <div>
      <h2>Teilnehmer hinzufügen</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="male">Mann</option>
        <option value="female">Frau</option>
      </select>
      <button onClick={handleAdd}>➕ Hinzufügen</button>

      <ul>
        {players.map((p, idx) => (
          <li key={idx}>{p.name} ({p.gender === 'male' ? '♂️' : '♀️'})</li>
        ))}
      </ul>

      <br />
      <button className="neon-button primary" onClick={startGame} disabled={!ready}>🎲 Spiel starten</button>
    </div>
  );
}
