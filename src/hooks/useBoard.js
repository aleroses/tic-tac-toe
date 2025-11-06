import { useState } from 'react';
import { TURNS } from '../constants';
import {
  resetGameStorage,
  saveGameToStorage,
} from '../logic/storage';
import { checkEndGame, checkWinner } from '../logic/board';
import confetti from 'canvas-confetti';

export const useBoard = (size = 3) => {
  const totalSquares = size * size;

  const [board, setBoard] = useState(() => {
    const stored = window.localStorage.getItem('board');
    return stored
      ? JSON.parse(stored)
      : Array(totalSquares).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    return window.localStorage.getItem('turn') ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinner(newBoard, size);

    if (newWinner) {
      confetti();
      setWinner(turn);
      resetGameStorage();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      resetGameStorage();
    }
  };

  const resetGame = () => {
    setBoard(Array(totalSquares).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  return {
    board,
    turn,
    winner,
    updateBoard,
    resetGame,
  };
};
