import React, { useEffect, useState } from 'react';
import './ResultDisplay.css';

export default function ResultDisplay({ correctCount }) {
  const [lightsOn, setLightsOn] = useState(0);

  useEffect(() => {
    if (typeof correctCount === 'number') {
      setLightsOn(0);
      const interval = setInterval(() => {
        setLightsOn(prev => {
          if (prev < correctCount) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 500);
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
    </div>
  );
}
