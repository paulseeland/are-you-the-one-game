import React, { useState } from 'react';
import './PlayerForm.css'; // Du wirst gleich CSS dafür brauchen

export default function PlayerForm({ players, addPlayer, startGame }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!name.trim()) return;

    if (editingIndex !== null) {
      // Update bestehender Teilnehmer
      const updated = [...players];
      updated[editingIndex] = { name: name.trim(), gender };
      setPlayers(updated); // ACHTUNG: Hier musst du später noch `setPlayers` vom App-Component übergeben!
      setEditingIndex(null);
    } else {
      addPlayer(name.trim(), gender);
    }

    setName('');
  };

  const handleEdit = (index) => {
    setName(players[index].name);
    setGender(players[index].gender);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated); // ACHTUNG: Auch hier muss `setPlayers` vom App-Component kommen
    if (editingIndex === index) {
      setName('');
      setEditingIndex(null);
    }
  };

  const ready =
    players.filter(p => p.gender === 'male').length ===
      players.filter(p => p.gender === 'female').length &&
    players.length >= 4;

  return (
    <div>
      <h2>Teilnehmer hinzufügen</h2>
      <div className="form-row">
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
        <button onClick={handleAddOrUpdate}>
          {editingIndex !== null ? '✏️ Speichern' : '➕ Hinzufügen'}
        </button>
      </div>

      <div className="player-grid">
        {players.map((p, index) => (
          <div className="player-card" key={index}>
            <div className="player-info">
              <span className="player-name">{p.name}</span>
              <span className="player-gender">{p.gender === 'male' ? '♂️' : '♀️'}</span>
            </div>
            <div className="player-actions">
              <button onClick={() => handleEdit(index)} title="Bearbeiten">✏️</button>
              <button onClick={() => handleDelete(index)} title="Löschen">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <br />
      <button className="neon-button primary" onClick={startGame} disabled={!ready}>
        🎲 Spiel starten
      </button>
    </div>
  );
}
