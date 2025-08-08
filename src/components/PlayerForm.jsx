import React, { useState } from 'react';
import './PlayerForm.css';

export default function PlayerForm({ players, addPlayer, setPlayers, startGame }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!name.trim()) return;

    if (editingIndex !== null) {
      // Bearbeiten-Modus: Spieler aktualisieren
      const updatedPlayers = [...players];
      updatedPlayers[editingIndex] = { name: name.trim(), gender };
      setPlayers(updatedPlayers);
      setEditingIndex(null);
    } else {
      // Neuen Spieler hinzufügen
      addPlayer(name.trim(), gender);
    }

    // Felder leeren
    setName('');
    setGender('male');
  };

  const handleEdit = (index) => {
    const player = players[index];
    setName(player.name);
    setGender(player.gender);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
    if (editingIndex === index) {
      setName('');
      setGender('male');
      setEditingIndex(null);
    }
  };

  const ready =
    players.filter(p => p.gender === 'male').length === players.filter(p => p.gender === 'female').length &&
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
        <button onClick={handleAddOrUpdate} className="neon-button primary" >
          {editingIndex !== null ? '💾 Speichern' : '➕ Hinzufügen'}
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


