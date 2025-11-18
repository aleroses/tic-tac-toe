import { winningCombinations } from './winningCombinations';

/* export const checkWinner = (currentBoard, size) => {
  const wins = winningCombinations(size);

  return wins.some((line) => {
    const [first, ...rest] = line;

    return (
      currentBoard[first] &&
      rest.every((i) => {
        return currentBoard[i] === currentBoard[first];
      })
    );
  });
}; */

export const checkWinner = (boardNames, size) => {
  const wins = winningCombinations(size);

  for (const combo of wins) {
    const first = boardNames[combo[0]];
    
    if (!first) continue; // si la primera posición es null, no puede ganar esa línea

    let allEqual = true;
    for (let i = 1; i < combo.length; i++) {
      if (boardNames[combo[i]] !== first) {
        allEqual = false;
        break;
      }
    }

    if (allEqual) return first;
  }

  return null;
};
