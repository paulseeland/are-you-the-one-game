import React, { useEffect, useState } from 'react';
import './ResultDisplay.css';

export default function ResultDisplay({ correctCount, pairs }) {
  const [lightsOn, setLightsOn] = useState(0);

useEffect(() => {
  if (typeof correctCount === 'number') {
    setLightsOn(0);

    const timeouts = [];

    for (let i = 0; i < correctCount; i++) {
      const delay = Math.random() * 6000 + 1000; // 1000–7000 ms

      const timeout = setTimeout(() => {
        setLightsOn(prev => prev + 1);
      }, delay);

      timeouts.push(timeout);
    }

    // Optional: Clean-up falls Komponente entladen wird
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }
}, [correctCount]);


  if (correctCount === null) {
    return <p>Bitte Matching Night durchführen, um Ergebnisse zu sehen.</p>;
  }

  return (
    <div className="result-display">
      <h2>💡 Anzahl korrekter Paare</h2>
      <div className="spotlight-row">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`spotlight ${i < lightsOn ? 'on' : ''}`}></div>
        ))}
      </div>
      {lightsOn === correctCount && (
        <p className="result-text">
          Es gibt <strong>{correctCount}</strong> korrekte Paar{correctCount === 1 ? '' : 'e'}!
        </p>
      )}

      <h3>Alle gewählten Paare:</h3>
      <div className="pairs-grid">
        {pairs.map((pair, i) => (
          <div key={i} className="pair-card">
            <span>{pair.male} ❤️ {pair.female}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


