import React, { useState } from 'react';

export default function MatchingBox({ players, correctPairs }) {
  const males = players.filter(p => p.gender === 'male');
  const females = players.filter(p => p.gender === 'female');

  const [selectedMale, setSelectedMale] = useState('');
  const [selectedFemale, setSelectedFemale] = useState('');
  const [attempts, setAttempts] = useState([]); // gespeicherte Versuche
  const [animation, setAnimation] = useState(null); // 'heart' | 'broken' | null

  const checkMatch = () => {
    if (!selectedMale || !selectedFemale) {
      alert('Bitte wähle einen Mann und eine Frau aus.');
      return;
    }

    const isCorrect = correctPairs.some(
      p => (p.male === selectedMale && p.female === selectedFemale) ||
           (p.female === selectedMale && p.male === selectedFemale) // falls vertauscht
    );

    const newAttempt = {
      male: selectedMale,
      female: selectedFemale,
      correct: isCorrect,
      id: Date.now(),
    };

    setAttempts(prev => [newAttempt, ...prev]);
    setAnimation(isCorrect ? 'heart' : 'broken');

    // Animation nach 2 Sekunden zurücksetzen
    setTimeout(() => setAnimation(null), 2000);
  };

  return (
    <div>
      <h2>Matching Box</h2>

      <div style={{ marginBottom: 20 }}>
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

        <button onClick={checkMatch} style={{ marginLeft: 10 }}>Prüfen</button>
      </div>

      {/* Animation */}
      <div style={{ height: 50, marginBottom: 20 }}>
        {animation === 'heart' && (
          <span style={{ fontSize: 40, color: 'red', animation: 'pulse 1.5s ease' }}>❤️</span>
        )}
        {animation === 'broken' && (
          <span style={{ fontSize: 40, color: 'darkred', animation: 'shake 1.5s ease' }}>💔</span>
        )}
      </div>

      <h3>Versuche</h3>
      <ul>
        {attempts.map(a => (
          <li key={a.id}>
            {a.male} + {a.female} — {a.correct ? '✅ richtig' : '❌ falsch'}
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
