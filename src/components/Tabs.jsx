import React from 'react';

export default function Tabs({ current, setCurrent, available }) {
  const tabs = [
    { key: 'setup', label: '🧑‍🤝‍🧑 Teilnehmer' },
    { key: 'match', label: '🎮 Matching Night' },
    { key: 'lights', label: '💡 Result' },
    { key: 'check', label: '🔍 Einzelprüfung' },
  ];

  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`tab-button ${current === tab.key ? 'active' : ''}`}
          onClick={() => setCurrent(tab.key)}
          disabled={!available && tab.key !== 'setup'}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
