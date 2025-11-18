import { useEffect, useReducer } from 'react';
import {
  gameReducer,
  initialGameState,
} from '../reducer/gameReducer';
import { GameContext } from './GameContext';
import { GameStorage } from '../logic/storage';

export const GameProvider = ({ children }) => {
  // savedState or stored
  const savedState = GameStorage.load();

  const [state, dispatch] = useReducer(
    gameReducer,
    savedState
      ? { ...initialGameState, ...savedState }
      : initialGameState
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
