export function generateMatches(players) {
    const males = players.filter(p => p.gender === 'male');
    const females = players.filter(p => p.gender === 'female');
  
    // Shuffle utility
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  
    const shuffledFemales = shuffle(females);
    const matches = males.map((male, index) => ({
      male: male.name,
      female: shuffledFemales[index]?.name
    }));
  
    return matches;
  }
  