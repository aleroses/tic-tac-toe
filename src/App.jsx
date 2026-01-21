import { useContext, useEffect } from 'react';
import { GameContext } from './context/GameContext';

import { GameModeModal } from './components/GameModeModal';

import { LevelSelector } from './components/LevelSelector';
import { Square } from './components/Square';
import { CharacterSelector } from './components/CharacterSelector';
import { WinnerModal } from './components/WinnerModal';

import { isDraw, updateBoard } from './logic/board';
import { checkWinner } from './logic/checkWinner';

import { LEVELS } from './constants';
import confetti from 'canvas-confetti';

import {
  getComputerMove,
  getRandomCharacter,
} from './logic/ai';
import logo from './assets/logo.png';
import { MachineSelector } from './components/MachineSelector';

function App() {
  const { state, dispatch } = useContext(GameContext);
  const {
    size,
    board,
    player1,
    player2,
    turn,
    winner,
    // mode,
    showGameModeModal,
    aiLevel,
    gameMode,
  } = state;

  // console.log(mode);

  // 🔹 IA EFFECT (siempre se declara)
  useEffect(() => {
    if (
      gameMode !== 'PVC' ||
      turn !== player2 ||
      winner ||
      !player2
    )
      return;

    const move = getComputerMove(
      board,
      size,
      aiLevel,
      player2,
      player1
    );

    if (move == null) return;

    const timer = setTimeout(() => {
      handlePlay(move);
    }, 350);

    return () => clearTimeout(timer);
  }, [
    turn,
    board,
    winner,
    gameMode,
    aiLevel,
    size,
    player1,
    player2,
  ]);

  // 🔹 Confetti EFFECT (siempre se declara)
  useEffect(() => {
    if (winner && winner !== false) {
      confetti({
        // zIndex: 999,
        particleCount: 80,
        spread: 70,
      });
    }
  }, [winner]);

  // 🔹 AHORA sí, render condicional
  if (showGameModeModal) {
    return <GameModeModal />;
  }

  const handleSize = (boxes) => {
    dispatch({
      type: 'SET_SIZE',
      payload: boxes,
    });
  };

  const setPlayer = (playerKey, name) => {
    // 🟢 Player 1 elige
    if (playerKey === 'player1') {
      if (gameMode === 'PVC') {
        const computerCharacter = getRandomCharacter(name);

        dispatch({
          type: 'SET_PLAYERS',
          payload: {
            player1: name,
            player2: computerCharacter,
          },
        });
        return;
      }

      dispatch({
        type: 'SET_PLAYERS',
        payload: {
          ...state,
          player1: name,
        },
      });
      return;
    }

    // 🟢 Player 2 SOLO si es PVP
    if (playerKey === 'player2' && gameMode === 'PVP') {
      dispatch({
        type: 'SET_PLAYERS',
        payload: {
          ...state,
          player2: name,
        },
      });
    }
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

  const resetGame = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <main className='board' aria-live='polite'>
      <div className='logo-wrapper'>
        <img
          className='logo'
          src={logo}
          alt='Tic Tac Toe Logo'
          loading='eager'
        />
      </div>

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
        {/* <MachineSelector /> */}

        <button
          className='reset'
          onClick={resetGame}
          aria-label='Reset the game'
          title='Reset the game'
        >
          Reset of the Game
        </button>
        {/* </div> */}
        <CharacterSelector
          label='Player 2'
          setPlayer={(name) => setPlayer('player2', name)}
          excludeOpponent={player1}
          disabled={gameMode === 'PVC'}
        />
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
