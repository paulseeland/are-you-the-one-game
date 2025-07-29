import React, { useState } from 'react';
import './App.css';
import Tabs from './components/Tabs';
import PlayerInput from './components/PlayerInput';
import MatchPanel from './components/MatchPanel';
import ResultPanel from './components/ResultPanel';
import MatchingBox from './components/MatchingBox';

function App() {
  const [players, setPlayers] = useState([]);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [matchingResults, setMatchingResults] = useState(0);
  const [activeTab, setActiveTab] = useState('playerInput');

  const handlePlayerSubmit = (submittedPlayers) => {
    setPlayers(submittedPlayers);
    setActiveTab('matchingNight');
  };

  const handleMatchingSubmit = (pairs) => {
    // Zufällige Anzahl korrekter Paare simulieren
    const matches = generateCorrectPairs(players);
    setCorrectPairs(matches);

    const correctCount = countCorrectMatches(pairs, matches);
    setMatchingResults(correctCount);
    setActiveTab('results');
  };

  const generateCorrectPairs = (players) => {
    const males = players.filter(p => p.gender === 'male');
    const females = players.filter(p => p.gender === 'female');

    const shuffled = [...females].sort(() => 0.5 - Math.random());
    return males.map((m, i) => ({ male: m.name, female: shuffled[i].name }));
  };

  const countCorrectMatches = (guessPairs, correctPairs) => {
    return guessPairs.reduce((count, pair) => {
      return correctPairs.some(p =>
        p.male === pair.male && p.female === pair.female
      ) ? count + 1 : count;
    }, 0);
  };

  return (
    <div className="App">
      <h1>Are You The One? Spiel</h1>

      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { key: 'playerInput', label: 'Spieler' },
          { key: 'matchingNight', label: 'Matching Night' },
          { key: 'results', label: 'Results' },
          { key: 'matchingBox', label: 'Matching Box' }
        ]}
      />

      <div className="tab-content">
        {activeTab === 'playerInput' && (
          <PlayerInput onSubmit={handlePlayerSubmit} />
        )}

        {activeTab === 'matchingNight' && (
          <MatchPanel players={players} onSubmit={handleMatchingSubmit} />
        )}

        {activeTab === 'results' && (
          <ResultPanel correctCount={matchingResults} />
        )}

        {activeTab === 'matchingBox' && (
          <MatchingBox players={players} correctPairs={correctPairs} />
        )}
      </div>
    </div>
  );
}

export default App;
