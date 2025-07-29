import React, { useState } from 'react';
import Tabs from './components/Tabs';
import PlayerForm from './components/PlayerForm';
import MatchPanel from './components/MatchPanel';
import ResultDisplay from './components/ResultDisplay';
import MatchingBox from './components/MatchingBox';

function App() {
  const [players, setPlayers] = useState([]);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [matchingResults, setMatchingResults] = useState(0);
  const [activeTab, setActiveTab] = useState('playerForm');

  const addPlayer = (name, gender) => {
    setPlayers(prev => [...prev, { name, gender }]);
  };

  const startGame = () => {
    setActiveTab('matchingNight');
  };
  
  const handlePlayerSubmit = (submittedPlayers) => {
    setPlayers(submittedPlayers);
    setActiveTab('match');
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
      <h1>🌴 Are You The One? Das Spiel 🌴</h1>

      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { key: 'playerForm', label: 'Spieler' },
          { key: 'matchingNight', label: 'Matching Night' },
          { key: 'results', label: 'Results' },
          { key: 'matchingBox', label: 'Matching Box' }
        ]}
      />

      <div className="tab-content">
        {activeTab === 'playerForm' && (
          <PlayerForm 
            players={players}
            addPlayer={addPlayer}
            satrtGame={startGame}
          />
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
