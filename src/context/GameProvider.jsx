import { useEffect, useReducer } from 'react';
import {
  gameReducer,
  initialGameState,
} from '../reducer/gameReducer';
import { GameContext } from './GameContext';
import { GameStorage } from '../logic/storage';
import { createEmptyBoard } from '../logic/board';

export const GameProvider = ({ children }) => {
  // savedState or stored
  const savedState = GameStorage.load();

  const mergedState = savedState
    ? {
        ...initialGameState,
        size: savedState.size ?? initialGameState.size,
        player1:
          savedState.player1 ?? initialGameState.player1,
        player2:
          savedState.player2 ?? initialGameState.player2,
        board: createEmptyBoard(
          savedState.size ?? initialGameState.size
        ),
        winner: null,
        turn: null,
      }
    : initialGameState;

  // const [state, dispatch] = useReducer(
  //   gameReducer,
  //   savedState ? { ...initialGameState, ...savedState } : initialGameState
  // );

  const [state, dispatch] = useReducer(
    gameReducer,
    mergedState
  );

  // Persistencia: guarda el estado completo cada vez que cambia
  useEffect(() => {
    GameStorage.save(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
