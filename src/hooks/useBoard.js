import { useEffect, useState } from 'react';
import { TURNS } from '../constants';
import {
  resetGameStorage,
  saveGameToStorage,
} from '../logic/storage';
import confetti from 'canvas-confetti';
import { checkWinner } from '../logic/checkWinner';
import { checkEndGame } from '../logic/checkEndGame';

export const useBoard = (size = 3) => {
  const totalSquares = size * size;

  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board');
    return boardStorage
      ? JSON.parse(boardStorage)
      : Array(totalSquares).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem('turn');
    return turnStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // 👇 Si el tamaño cambia, reseteamos el tablero automáticamente
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
  }, [size]);

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
