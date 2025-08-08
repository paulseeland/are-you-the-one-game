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
  const [gameStarted, setGameStarted] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const addPlayer = (name, gender) => {
    setPlayers(prev => [...prev, { name, gender }]);
  };

  const generateCorrectPairs = (players) => {
    const males = players.filter(p => p.gender === 'male');
    const females = players.filter(p => p.gender === 'female');
    const shuffled = [...females].sort(() => 0.5 - Math.random());
    return males.map((m, i) => ({ male: m.name, female: shuffled[i]?.name }));
  };

  const countCorrectMatches = (guessPairs, correctPairs) => {
    return guessPairs.reduce((count, pair) => {
      return correctPairs.some(p =>
        p.male === pair.male && p.female === pair.female
      ) ? count + 1 : count;
    }, 0);
  };

  const startGame = () => {
    const maleCount = players.filter(p => p.gender === 'male').length;
    const femaleCount = players.filter(p => p.gender === 'female').length;

    if (maleCount === 0 || femaleCount === 0) {
      alert('Bitte mindestens einen Mann und eine Frau hinzufügen.');
      return;
    }

    if (maleCount !== femaleCount) {
      alert('Bitte gleiche Anzahl Männer und Frauen hinzufügen.');
      return;
    }

    const initialPairs = generateCorrectPairs(players);
    setCorrectPairs(initialPairs); // Nur hier einmal generieren und speichern
    setGameStarted(true);
    setActiveTab('matchingNight');
  };

  const [submittedPairs, setSubmittedPairs] = useState ([]);
  
  const handleMatchingSubmit = (pairs) => {
    setSubmittedPairs(pairs); // Gespeicherte Paare übergeben
    // Nutze den bereits generierten correctPairs, nicht neu generieren!
    const correctCount = countCorrectMatches(pairs, correctPairs);
    setMatchingResults(correctCount);
    setActiveTab('results');
  };

  const addGuess = (guessEntry) => {
    setGuesses(prev => [...prev, guessEntry]);
  };

  const restartGame = () => {
    setPlayers([]);
    setCorrectPairs([]);
    setMatchingResults(0);
    setActiveTab('playerForm');
    setGameStarted(false);
    setGuesses([]);
  };
  
  return (
    <div className="App">
      <h1>🌴 Are You The One? 🌴</h1>

      {gameStarted && (
        <button onClick={restartGame} className="action.button">
          🔁 Spiel neu starten
        </button>
      )}
      
      <Tabs
        current={activeTab}
        setCurrent={setActiveTab}
        available={gameStarted}
      />

      <div className="tab-content">
        {activeTab === 'playerForm' && (
          <PlayerForm
            players={players}
            addPlayer={addPlayer}
            startGame={startGame}
            setPlayers={setPlayers}
          />
        )}

        {activeTab === 'matchingNight' && (
          <MatchPanel players={players} onSubmit={handleMatchingSubmit} setCurrentTab={setActiveTab} />
        )}

        {activeTab === 'results' && (
          <ResultDisplay correctCount={matchingResults} pairs={submittedPairs} />
        )}

        {activeTab === 'matchingBox' && (
          <MatchingBox
            malePlayers={players.filter(p => p.gender === 'male').map(p => p.name)}
            femalePlayers={players.filter(p => p.gender === 'female').map(p => p.name)}
            matches={correctPairs}
            guesses={guesses}
            addGuess={addGuess}
          />
        )}
      </div>
    </div>
  );
}

export default App;






