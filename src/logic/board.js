import { WINNER_COMBOS } from '../constants';
import { winningCombinations } from './winningCombinations';

export const checkWinner = (currentBoard, size) => {
  /* for (const combo of winningCombinations) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  return null; */

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
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
