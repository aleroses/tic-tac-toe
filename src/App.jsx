import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkEndGame, checkWinner } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import {
  resetGameStorage,
  saveGameToStorage,
} from './logic/storage';
import { updateBoard } from './logic/updateBoard';

function App() {
  const size = 3;
  const totalSquares = size * size;

  const [board, setBoard] = useState(() => {
    // The function is only executed once
    const boardFromStorage =
      window.localStorage.getItem('board');

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(totalSquares).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage =
      window.localStorage.getItem('turn');

    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(totalSquares).fill(null));

    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const gameClasses =
    size > 3 && size < 5 ? `game${size}` : `game${size}`;

  return (
    <main className='board'>
      {/* <h1>Tic tac toe</h1> */}

      <section className={`game ${gameClasses}`}>
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={() =>
                updateBoard({
                  index,
                  board,
                  turn,
                  winner,
                  size,
                  setBoard,
                  setTurn,
                  setWinner,
                })
              }
              // board={board}
              // turn={turn}
              // winner={winner}
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
