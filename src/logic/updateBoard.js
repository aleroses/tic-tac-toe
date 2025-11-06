import confetti from 'canvas-confetti';
import { TURNS } from '../constants';
import { checkEndGame, checkWinner } from './board';
import {
  resetGameStorage,
  saveGameToStorage,
} from './storage';

export const updateBoard = ({
  index,
  board,
  turn,
  winner,
  size,
  setBoard,
  setTurn,
  setWinner,
}) => {
  if (board[index] || winner) return;

  const newBoard = [...board]; // structureClone
  newBoard[index] = turn;
  setBoard(newBoard);

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);
  saveGameToStorage({ board: newBoard, turn: newTurn });

  const newWinner = checkWinner(newBoard, size);

  if (newWinner) {
    confetti();
    setWinner((prevWinner) => {
      return turn;
    });

    resetGameStorage();
  } else if (checkEndGame(newBoard)) {
    setWinner(false);

    resetGameStorage();
  }
};
