import { useEffect, useReducer } from 'react';
import {
  gameReducer,
  initialGameState,
} from '../reducer/gameReducer';
import { GameContext } from './GameContext';
import { GameStorage } from '../logic/storage';

const init = (initialState) => {
  const saved = GameStorage.load();

  return saved
    ? {
        ...initialState,
        ...saved,
      }
    : initialState;
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState,
    init
  );

  // Persistence: saves the complete state every time it changes
  useEffect(() => {
    GameStorage.save(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
