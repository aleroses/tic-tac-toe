import { useState } from 'react';

import { SelectBoxes } from './components/SelectBoxes';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { CharacterSelector } from './components/CharacterSelector';

import { useBoard } from './hooks/useBoard';
import { saveBoxes } from './logic/storage';

import { SELECT_BOXES, TURNS } from './constants';

function App() {
  const [boxes, setBoxes] = useState(() => {
    return window.localStorage.getItem('boxes') ?? 3;
  });

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  // const size = 3;

  const { board, turn, winner, updateBoard, resetGame } =
    useBoard(boxes, player1, player2);

  const updateBoxes = (item) => {
    setBoxes(item);

    saveBoxes(item);
  };

  return (
    <main className='board'>
      <section className='options'>
        {SELECT_BOXES.map((item, index) => (
          <SelectBoxes
            key={index}
            item={item}
            updateBoxes={updateBoxes}
            resetGame={resetGame}
          >
            {item}
          </SelectBoxes>
        ))}
      </section>

      <section className={`game game${boxes}`}>
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {square}
          </Square>
        ))}
      </section>

      <section className='options'>
        <CharacterSelector
          label='Player 1'
          setPlayer={setPlayer1}
          excludeOpponent={player2}
        />

        <button className='reset' onClick={resetGame}>
          Reset of the game
        </button>

        <CharacterSelector
          label='Player 2'
          setPlayer={setPlayer2}
          excludeOpponent={player1}
        />
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
