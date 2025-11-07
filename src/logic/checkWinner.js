import { winningCombinations } from './winningCombinations';

export const checkWinner = (currentBoard, size) => {
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
