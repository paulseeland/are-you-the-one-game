import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import MatchPanel from './components/MatchPanel';
import RevealCheck from './components/RevealCheck';
import SpotlightDisplay from './components/SpotlightDisplay';
import Tabs from './components/Tabs';
import { generateMatches } from './utils/matchGenerator';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentTab, setCurrentTab] = useState('setup');
  const [gameStarted, setGameStarted] = useState(false);
  const [lastMatchResult, setLastMatchResult] = useState(null);
  const [lights, setLights] = useState(0);

  const addPlayer = (name, gender) => {
    setPlayers(prev => [...prev, { name, gender }]);
  };

  const startGame = () => {
    const generated = generateMatches(players);
    setMatches(generated);
    setGameStarted(true);
    setCurrentTab('match');
  };

  const checkMatchRound = (inputPairs) => {
    let correct = 0;
    inputPairs.forEach(pair => {
      if (
        matches.some(
          match =>
            (match.male === pair.male && match.female === pair.female)
        )
      ) {
        correct += 1;
      }
    });
    setLights(correct);
  };

  const checkSingleMatch = (male, female) => {
    const isMatch = matches.some(
      pair => pair.male === male && pair.female === female
    );
    setLastMatchResult(isMatch);
  };

  return (
    <div className="app">
      <h1>🌴 Are You The One? – Das Spiel</h1>
      <Tabs current={currentTab} setCurrent={setCurrentTab} available={gameStarted} />

      {currentTab === 'setup' && (
        <PlayerForm players={players} addPlayer={addPlayer} startGame={startGame} />
      )}
      {currentTab === 'match' && (
        <MatchPanel players={players} onSubmit={checkMatchRound} />
      )}
      {currentTab === 'lights' && (
        <SpotlightDisplay lights={lights} />
      )}
      {currentTab === 'check' && (
        <RevealCheck players={players} onCheck={checkSingleMatch} result={lastMatchResult} />
      )}
    </div>
  );
}
