import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

import { CHARACTERS } from '../constants';
import {
  resetGameStorage,
  saveGameToStorage,
} from '../logic/storage';
import { checkWinner } from '../logic/checkWinner';
import { checkEndGame } from '../logic/checkEndGame';

export const useBoard = (size = 3, player1, player2) => {
  const totalSquares = size * size;

  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board');
    return boardStorage
      ? JSON.parse(boardStorage)
      : Array(totalSquares).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem('turn');
    return turnStorage ?? player1;
  });

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // 👇 Si el tamaño cambia, reseteamos el tablero automáticamente
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setTurn(player1 ?? null);
  }, [size]);

  useEffect(() => {
    if (player1 && player2) {
      setBoard(Array(size * size).fill(null));
      setWinner(null);
      setTurn(player1); // el primero siempre empieza
    }
  }, [player1, player2, size]);

  const updateBoard = (index) => {
    // 🧩 Si no hay turno activo o ya hay ganador, no hacemos nada
    if (!turn || board[index] || winner) return;

    const newBoard = [...board];

    // Obtenemos el objeto del jugador actual (con nombre y src)
    const currentPlayer = CHARACTERS.find(
      (c) => c.name === turn
    );

    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const newTurn = turn === player1 ? player2 : player1;
    setTurn(newTurn);

    saveGameToStorage({ board: newBoard, turn: newTurn });

    // const newWinner = checkWinner(newBoard, size);
    const newWinner = checkWinner(
      newBoard.map((cell) => cell?.name || null),
      size
    );

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
    setTurn(player1);
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
