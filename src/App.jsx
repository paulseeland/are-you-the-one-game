import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import MatchPanel from './components/MatchPanel';
import ResultDisplay from './components/ResultDisplay';
import Tabs from './components/Tabs';
import './styles.css';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [perfectMatches, setPerfectMatches] = useState([]);
  const [currentTab, setCurrentTab] = useState('setup');
  const [matchingNightResult, setMatchingNightResult] = useState(null);

  const addPlayer = (name, gender) => {
    setPlayers(prev => [...prev, { name, gender }]);
  };

  const handlePairsSubmit = (pairs) => {
    const count = pairs.filter(p =>
      perfectMatches.some(m =>
        m.male === p.male && m.female === p.female
      )
    ).length;
    setMatchingNightResult(count);
    setCurrentTab('lights');
  };

  return (
    <div className="app">
      <h1>🌴 Are You The One? – Das Spiel</h1>
      <Tabs
        current={currentTab}
        setCurrent={setCurrentTab}
        available={players.length > 1}
      />

      {currentTab === 'setup' && (
        <PlayerForm players={players} addPlayer={addPlayer} />
      )}
      {currentTab === 'match' && (
        <MatchPanel
          players={players}
          onSubmit={handlePairsSubmit}
          setCurrentTab={setCurrentTab}
        />
      )}
      {currentTab === 'lights' && (
        <ResultDisplay result={matchingNightResult} />
      )}
    </div>
  );
}
