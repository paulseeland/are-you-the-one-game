import React from 'react';
import './Tabs.css';

export default function Tabs({ current, setCurrent, available }) {
  const tabs = [
    { key: 'playerForm', label: '🧑‍🤝‍🧑 Teilnehmer' },
    { key: 'matchingNight', label: '🎯 Matching Night' },
    { key: 'results', label: '💡 Ergebnis' },
    { key: 'matchingBox', label: '💘 Matching Box' },
  ];

  return (
    <div className="tabs-vertical">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`tab-button ${current === tab.key ? 'active' : ''}`}
          onClick={() => setCurrent(tab.key)}
          disabled={!available && tab.key !== 'playerForm'} // Nur 'playerForm' ist immer aktiv
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
