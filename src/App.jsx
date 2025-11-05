import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import {
  resetGameStorage,
  saveGameToStorage,
} from './logic/storage';

function App() {
  const [board, setBoard] = useState(() => {
    // The function is only executed once
    const boardFromStorage =
      window.localStorage.getItem('board');

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage =
      window.localStorage.getItem('turn');

    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));

    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board]; // structureClone
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      confetti();
      setWinner((prevWinner) => {
        return newWinner;
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className='board'>
      {/* <h1>Tic tac toe</h1> */}

      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <button onClick={resetGame}>Reset of the game</button>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
