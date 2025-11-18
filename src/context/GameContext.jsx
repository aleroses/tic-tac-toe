import { createContext } from 'react';

export const GameContext = createContext({
  state: null,
  dispatch: () => {},
});
