import React from 'react';

export default function SpotlightDisplay({ lights }) {
  const spots = Array.from({ length: 12 }, (_, i) => i < lights);

  return (
    <div>
      <h2>Scheinwerfer zeigen Matches</h2>
      <div className="spotlights">
        {spots.map((active, i) => (
          <div
            key={i}
            className={`spot ${active ? 'active' : ''}`}
          ></div>
        ))}
      </div>
      <p>{lights} von 12 Paaren sind korrekt.</p>
    </div>
  );
}
