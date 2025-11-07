import { Square } from './components/Square';
import { SELECT_BOXES, TURNS } from './constants';
import { WinnerModal } from './components/WinnerModal';
import { useBoard } from './hooks/useBoard';
import { SelectBoxes } from './components/SelectBoxes';
import { useState } from 'react';
import { saveBoxes } from './logic/storage';

function App() {
  const [boxes, setBoxes] = useState(() => {
    return window.localStorage.getItem('boxes') ?? 3;
  });

  // const size = 3;

  const { board, turn, winner, updateBoard, resetGame } =
    useBoard(boxes);

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

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <button className='reset' onClick={resetGame}>
          Reset of the game
        </button>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
