import { useContext, useEffect } from 'react';

import { LevelSelector } from './components/LevelSelector';
import { Square } from './components/Square';
import { CharacterSelector } from './components/CharacterSelector';
import { WinnerModal } from './components/WinnerModal';

import { GameContext } from './context/GameContext';
import { isDraw, updateBoard } from './logic/board';
import { checkWinner } from './logic/checkWinner';

import { LEVELS } from './constants';
import confetti from 'canvas-confetti';

import logo from './assets/logo.png';

function App() {
  const { state, dispatch } = useContext(GameContext);
  const { size, board, player1, player2, turn, winner } =
    state;

  console.log(state);

  // Efecto para lanzar confetti cuando hay un ganador
  useEffect(() => {
    if (winner && winner !== false) {
      confetti({
        zIndex: 999,
        particleCount: 80,
        spread: 70,
      });
    }
  }, [winner]);

  const updateBoxes = (boxes) => {
    dispatch({ type: 'SET_SIZE', payload: boxes });
  };

  const setPlayer = (player, name) => {
    // slot: 'player1' | 'player2'
    /* const payload = {
      player1: slot === 'player1' ? playerName : player1,
      player2: slot === 'player2' ? playerName : player2,
    }; */

    const payload = {
      ...state,
      [player]: name,
    };

    dispatch({ type: 'SET_PLAYERS', payload });
  };

  // Si no hay `turn` y existen ambos players, asignamos player1 como turno inicial
  // (esto en componentes puede verificarse y dispatch SET_PLAYERS si necesario)

  const handlePlay = (index) => {
    if (!turn || board[index] || winner) return;

    const newBoard = updateBoard(board, index, turn);
    // checkWinner recibe array de nombres (ya tenemos nombres)
    const newWinner = checkWinner(newBoard, size);
    const draw = !newWinner && isDraw(newBoard);

    dispatch({
      type: 'PLAY',
      payload: {
        board: newBoard,
        turn:
          newWinner || draw
            ? null
            : turn === player1
            ? player2
            : player1,
        winner: newWinner ? turn : draw ? false : null,
      },
    });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <main className='board' aria-live='polite'>
      <img
        className='logo'
        src={logo}
        alt='Tic Tac Toe Logo'
      />

      <section
        className='levels'
        role='tablist'
        aria-label='Game difficulty'
      >
        {LEVELS.map((item, index) => (
          <LevelSelector
            key={index}
            boxes={item.boxes}
            level={item.level}
            updateBoxes={updateBoxes}
            resetGame={resetGame}
            active={size === item.boxes}
          />
        ))}
      </section>

      <section
        className={`game game${size}`}
        aria-label={`Game board ${size} by ${size}`}
      >
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            handlePlay={handlePlay}
            square={square}
            disabled={!!winner}
          />
        ))}
      </section>

      <section className='characters' aria-label='Players'>
        <CharacterSelector
          label='Player 1'
          current={player1}
          setPlayer={(name) => setPlayer('player1', name)}
          excludeOpponent={player2}
        />

        <button
          className='reset'
          onClick={resetGame}
          aria-label='Reset the game'
          title='Reset the game'
        >
          Reset of the game
        </button>

        <CharacterSelector
          label='Player 2'
          current={player2}
          setPlayer={(name) => setPlayer('player2', name)}
          excludeOpponent={player1}
        />
      </section>

      <WinnerModal
        dispatch={dispatch}
        winner={winner}
        resetGame={resetGame}
      />
    </main>
  );
}

export default App;
