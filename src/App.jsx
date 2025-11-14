import { useState } from 'react';

import { LevelSelector } from './components/LevelSelector';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { CharacterSelector } from './components/CharacterSelector';

import { useBoard } from './hooks/useBoard';
import { saveBoxes } from './logic/storage';

import { LEVELS } from './constants';

import logo from './assets/logo.png';

function App() {
  const [boxes, setBoxes] = useState(() => {
    return (
      window.localStorage.getItem('boxes') ??
      SELECT_LEVEL[0].boxes
    );
  });

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  // const size = 3;

  const { board, turn, winner, updateBoard, resetGame } =
    useBoard(boxes, player1, player2);

  const updateBoxes = (boxes) => {
    setBoxes(boxes);

    saveBoxes(boxes);
  };

  return (
    <main className='board'>
      <img className='logo' src={logo} alt='Logo' />
      
      <section className='levels'>
        {LEVELS.map((item, index) => (
          <LevelSelector
            key={index}
            boxes={item.boxes}
            level={item.level}
            updateBoxes={updateBoxes}
            resetGame={resetGame}
            active={boxes === item.boxes}
          />
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
