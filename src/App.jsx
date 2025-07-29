import React, { useState } from 'react';
import PlayerInput from './components/PlayerInput';
import TruthBooth from './components/TruthBooth';
import MatchPanel from './components/MatchPanel';
import ResultDisplay from './components/ResultDisplay';

import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [perfectMatches, setPerfectMatches] = useState([]);
  const [currentTab, setCurrentTab] = useState('input');
  const [matchingNightResult, setMatchingNightResult] = useState(null);

  const handleAddPlayer = (player) => {
    setPlayers(prev => [...prev, player]);
  };

  const handleTruthBoothResult = (male, female, isMatch) => {
    if (isMatch) {
      setPerfectMatches(prev => [...prev, { male, female }]);
    }
  };

  const handleMatchingNight = (submittedPairs) => {
    const correctPairs = submittedPairs.filter(pair =>
      perfectMatches.some(
        match => match.male === pair.male && match.female === pair.female
      )
    ).length;

    setMatchingNightResult(correctPairs);

    // 🔁 Tab automatisch wechseln
    setCurrentTab('lights');
  };

  return (
    <div className="app-container">
      <h1>Are You The One? - Spiel</h1>
      <div className="tab-container">
        <div className="tabs">
          <button className={currentTab === 'input' ? 'active' : ''} onClick={() => setCurrentTab('input')}>👥 Spieler</button>
          <button className={currentTab === 'booth' ? 'active' : ''} onClick={() => setCurrentTab('booth')}>📸 Truth Boo
