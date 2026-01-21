import { checkWinner } from './checkWinner';
import { CHARACTERS } from '../constants';

export const getRandomCharacter = (exclude) => {
  const available = CHARACTERS.map((c) => c.name).filter(
    (name) => name !== exclude
  );

  return available[
    Math.floor(Math.random() * available.length)
  ];
};

const getRandomMove = (board) => {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);

  return empty[Math.floor(Math.random() * empty.length)];
};

const getBestMove = (board, size, ai, human) => {
  // versión simple: bloquear o ganar
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = ai;
      if (checkWinner(test, size) === ai) return i;
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = human;
      if (checkWinner(test, size) === human) return i;
    }
  }

  return getRandomMove(board);
};

export const getComputerMove = (
  board,
  size,
  level,
  ai,
  human
) => {
  if (level === 'easy') {
    return getRandomMove(board);
  }

  if (level === 'medium') {
    return Math.random() < 0.6
      ? getBestMove(board, size, ai, human)
      : getRandomMove(board);
  }

  // hard
  return getBestMove(board, size, ai, human);
};
