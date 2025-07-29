import React, { useState } from 'react';

export default function RevealCheck({ players, onCheck, result }) {
  const males = players.filter(p => p.gender === 'male');
  const females = players.filter(p => p.gender === 'female');
  const [male, setMale] = useState('');
  const [female, setFemale] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (male && female) {
      onCheck(male, female);
      setChecked(true);
    }
  };

  return (
    <div>
      <h2>Einzelnes Paar prüfen</h2>
      <select value={male} onChange={e => setMale(e.target.value)}>
        <option value="">Mann wählen</option>
        {males.map(m => (
          <option key={m.name} value={m.name}>{m.name}</option>
        ))}
      </select>

      <select value={female} onChange={e => setFemale(e.target.value)}>
        <option value="">Frau wählen</option>
        {females.map(f => (
          <option key={f.name} value={f.name}>{f.name}</option>
        ))}
      </select>

      <button onClick={handleCheck}>🔍 Überprüfen</button>

      {checked && (
        <div className={`heart ${result ? '' : 'broken'}`}>
          {result ? '💖 Match!' : '💔 Kein Match'}
        </div>
      )}
    </div>
  );
}
