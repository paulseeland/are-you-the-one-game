import React, { useState } from 'react';
import './MatchPanel.css';

export default function MatchPanel({ players, onSubmit, setCurrentTab }) {
  const males = players.filter(p => p.gender === 'male');
  const females = players.filter(p => p.gender === 'female');
  const [pairs, setPairs] = useState([]);
  const [selectedMale, setSelectedMale] = useState('');
  const [selectedFemale, setSelectedFemale] = useState('');

  const addPair = () => {
    if (selectedMale && selectedFemale) {
      setPairs(prev => [...prev, { male: selectedMale, female: selectedFemale }]);
      setSelectedMale('');
      setSelectedFemale('');
    }
  };

  const handleSubmit = () => {
    if (pairs.length === males.length) {
      onSubmit(pairs);
      setPairs([]);
      setCurrentTab('results');
    } else {
      alert(`Bitte ${males.length} Paare eingeben.`);
    }
  };

  return (
    <div className="match-panel">
      <h2>🎯 Matching Night: Paare bilden</h2>
      <div className="dropdown-row">
        <select value={selectedMale} onChange={e => setSelectedMale(e.target.value)}>
          <option value="">Mann wählen</option>
          {males.map(m => (
            <option key={m.name} value={m.name}>{m.name}</option>
          ))}
        </select>
        <select value={selectedFemale} onChange={e => setSelectedFemale(e.target.value)}>
          <option value="">Frau wählen</option>
          {females.map(f => (
            <option key={f.name} value={f.name}>{f.name}</option>
          ))}
        </select>
        <button className="neon-button primary" onClick={addPair}>➕ Paar hinzufügen</button>
      </div>
      <ul>
        {pairs.map((p, i) => (
          <li key={i}>{p.male} ❤️ {p.female}</li>
        ))}
      </ul>
      <button className="neon-button primary" onClick={handleSubmit}>💡 Anzahl korrekter Paare anzeigen</button>
    </div>
  );
}
