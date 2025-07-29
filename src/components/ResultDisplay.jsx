import React, { useEffect, useState } from 'react';
import './ResultDisplay.css';

export default function ResultDisplay({ result }) {
  const [lightsOn, setLightsOn] = useState(0);

  useEffect(() => {
    if (typeof result === 'number') {
      setLightsOn(0);
      const interval = setInterval(() => {
        setLightsOn(prev => {
          if (prev < result) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 500);
    }
  }, [result]);

  if (result === null) {
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
      {lightsOn === result && (
        <p className="result-text">
          Es gibt <strong>{result}</strong> korrekte Paar{result === 1 ? '' : 'e'}!
        </p>
      )}
    </div>
  );
}
