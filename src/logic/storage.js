// Encapsula todo el acceso a localStorage para el estado del juego
const KEY = 'tic-tac-toe-state';

export const GameStorage = {
  save: (state) => {
    try {
      const { size, player1, player2 } = state;
      const data = {
        size,
        player1,
        player2,
      };

      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      // si el storage falla, no rompemos la app
      // podrías reportar este error a un logger si tienes
      console.warn('GameStorage.save failed', e);
    }
  },

  load: () => {
    try {
      const stored = localStorage.getItem(KEY);

      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('GameStorage.load failed', e);

      return null;
    }
  },

  reset: () => {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      console.warn('GameStorage.reset failed', e);
    }
  },
};
