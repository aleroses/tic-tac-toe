import { useContext, useEffect } from 'react';
import { GameContext } from './context/GameContext';

import { LevelSelector } from './components/LevelSelector';
import { Square } from './components/Square';
import { CharacterSelector } from './components/CharacterSelector';
import { WinnerModal } from './components/WinnerModal';

import { isDraw, updateBoard } from './logic/board';
import { checkWinner } from './logic/checkWinner';

import { LEVELS } from './constants';
import confetti from 'canvas-confetti';

import { getComputerMove } from './logic/ai';
import logo from './assets/logo.png';
import { MachineSelector } from './components/MachineSelector';

function App() {
  const { state, dispatch } = useContext(GameContext);
  const { size, board, player1, player2, turn, winner } =
    state;

  useEffect(() => {
    if (winner && winner !== false) {
      confetti({
        // zIndex: 999,
        particleCount: 80,
        spread: 70,
      });
    }
  }, [winner]);

  const handleSize = (boxes) => {
    dispatch({
      type: 'SET_SIZE',
      payload: boxes,
    });
  };

  const setPlayer = (player, name) => {
    dispatch({
      type: 'SET_PLAYERS',
      payload: {
        ...state,
        [player]: name,
      },
    });
  };

  const handlePlay = (index) => {
    if (!turn || board[index] || winner) return;

    const newBoard = updateBoard(board, index, turn);
    // checkWinner receives array of names
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

  useEffect(() => {
    // Si no hay turno, o no hay player2, o ya hay ganador -> nada
    if (!turn || !player2 || winner) return;

    // Solo actuamos cuando el turno pertenece a la computadora
    if (player2 === 'Computer' && turn === 'Computer') {
      // evita que la IA juegue si el tablero está completo
      const move = getComputerMove(
        board,
        size,
        state.aiLevel,
        'Computer',
        player1
      );

      if (move == null) return;

      // simular un "pensamiento" corto (opcional)
      const timer = setTimeout(() => {
        // llamar a la misma función que usaría un humano
        handlePlay(move);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [
    turn,
    player2,
    board,
    winner,
    size,
    state.aiLevel,
    player1,
  ]);

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
            handleSize={handleSize}
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
            // disabled={!!winner}
          />
        ))}
      </section>

      <section className='characters' aria-label='Players'>
        <CharacterSelector
          label='Player 1'
          setPlayer={(name) => setPlayer('player1', name)}
          excludeOpponent={player2}
        />

        {/* <div className='options-container'> */}
        <MachineSelector />
        {/* </div> */}
        <CharacterSelector
          label='Player 2'
          setPlayer={(name) => setPlayer('player2', name)}
          excludeOpponent={player1}
        />
      </section>

      <button
        className='reset'
        onClick={resetGame}
        aria-label='Reset the game'
        title='Reset the game'
      >
        Reset of the Game
      </button>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
