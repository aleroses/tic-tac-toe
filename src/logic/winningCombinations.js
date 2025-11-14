export const winningCombinations = (size) => {
  const wins = [];

  for (let row = 0; row < size; row++) {
    const line = [];

    for (let col = 0; col < size; col++) {
      line.push(row * size + col);
    }
    wins.push(line);
  }

  for (let col = 0; col < size; col++) {
    const line = [];

    for (let row = 0; row < size; row++) {
      line.push(row * size + col);
    }
    wins.push(line);
  }

  const mainDiagonal = [];
  for (let i = 0; i < size; i++) {
    // 0 4 8
    mainDiagonal.push(i * size + i);
  }
  wins.push(mainDiagonal);

  const antiDiagonal = [];
  for (let i = 0; i < size; i++) {
    // 2 4 6
    antiDiagonal.push(i * size + (size - i - 1));
  }
  wins.push(antiDiagonal);

  return wins;
};
