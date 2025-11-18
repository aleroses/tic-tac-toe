export const createEmptyBoard = (size) =>
  Array(size * size).fill(null);

export const updateBoard = (board, index, char) => {
  // placeCharacter or Colocar el personaje
  const newBoard = [...board];
  newBoard[index] = char;

  return newBoard;
};

export const isDraw = (board) =>
  board.every((cell) => cell != null);
