import React from 'react';
import './Tabs.css';

export default function Tabs({ current, setCurrent, available }) {
  const tabs = [
    { key: 'setup', label: '🧑‍🤝‍🧑 Teilnehmer' },
    { key: 'match', label: '🎯 Matching Night' },
    { key: 'lights', label: '💡 Ergebnis' },
    { key: 'matchingBox', label: '💘 Matching Box' },
  ];

  return (
    <div className="tabs-vertical">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`tab-button ${current === tab.key ? 'active' : ''}`}
          onClick={() => setCurrent(tab.key)}
          disabled={!available && tab.key === 'match'}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
