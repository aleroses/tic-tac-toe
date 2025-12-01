import { createEmptyBoard } from '../logic/board';

export const initialGameState = {
  size: 3,
  board: createEmptyBoard(3),
  player1: null,
  player2: null,
  turn: null, // name of the current player
  winner: null, // winner name or false for tie
};

export const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SIZE': {
      // const size = action.payload;
      const { size, turn } = action.payload;

      return {
        ...state,
        size,
        board: createEmptyBoard(size),
        // winner: null,
        // si ya hay player1 lo dejamos como turno por defecto
        // turn: state.player1 ?? null,
        // turn: null,
        // turn,
      };
    }

    case 'SET_PLAYERS': {
      const { player1, player2 } = action.payload;
      // const turn = player1 && player2 ? player1 : state.turn;
      const turn = player1 && player2 ? player1 : null;

      return {
        ...state,
        player1,
        player2,
        turn,
        board: createEmptyBoard(state.size),
        // winner: null,
      };
    }

    case 'PLAY': {
      // payload: { board, turn, winner }
      // const { board, turn, winner } = action.payload;

      return {
        ...state,
        ...action.payload, // board, turn, winner, etc
      };
    }

    case 'RESET':
      return {
        ...state,
        board: createEmptyBoard(state.size),
        turn: state.player2 ? state.player1 : null,
        winner: null,
        // turn: state.player1 ?? null,
        // turn: null,
      };

    default:
      return state;
  }
};
