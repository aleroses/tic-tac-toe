// src/logic/ai.js
import { updateBoard } from './board';
import { checkWinner } from './checkWinner';

/**
 * Devuelve un índice (0..n-1) donde la computadora debe jugar.
 * level: 'easy' | 'medium' | 'hard'
 * computerName, humanName: strings (ej. 'Mario', 'Toad' — el mismo valor que guardas en board)
 */
export const getComputerMove = (
  board,
  size,
  level,
  computerName,
  humanName
) => {
  const emptyIndices = board
    .map((v, i) => (v == null ? i : null))
    .filter((v) => v != null);

  if (emptyIndices.length === 0) return null;

  if (level === 'easy') {
    // movimiento aleatorio
    const rnd = Math.floor(
      Math.random() * emptyIndices.length
    );
    return emptyIndices[rnd];
  }

  // helper: probar un movimiento y ver si produce ganador
  const findWinningMove = (name) => {
    for (const idx of emptyIndices) {
      const newBoard = updateBoard(board, idx, name);
      const winner = checkWinner(newBoard, size);
      if (winner === name) return idx;
    }
    return null;
  };

  if (level === 'medium') {
    // 1) Busca ganar ahora
    const winMove = findWinningMove(computerName);
    if (winMove != null) return winMove;

    // 2) Bloquear si el humano puede ganar
    const blockMove = findWinningMove(humanName);
    if (blockMove != null) return blockMove;

    // 3) fallback aleatorio
    const rnd = Math.floor(
      Math.random() * emptyIndices.length
    );
    return emptyIndices[rnd];
  }

  // level === 'hard' -> minimax
  // puntuaciones: win computadora = +10, win humano = -10, empate = 0
  const minimax = (
    currentBoard,
    currentPlayer,
    depth = 0
  ) => {
    const winner = checkWinner(currentBoard, size);
    if (winner === computerName) return { score: 10 - depth };
    if (winner === humanName) return { score: depth - 10 };
    const isDraw = currentBoard.every((c) => c != null);
    if (isDraw) return { score: 0 };

    const moves = [];
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] == null) {
        // simular movimiento
        const nextBoard = [...currentBoard];
        nextBoard[i] = currentPlayer;

        const nextPlayer =
          currentPlayer === computerName
            ? humanName
            : computerName;

        const result = minimax(
          nextBoard,
          nextPlayer,
          depth + 1
        );
        moves.push({
          index: i,
          score: result.score,
        });
      }
    }

    // si es el turno de la computadora -> elegir el movimiento con mayor score
    if (currentPlayer === computerName) {
      let best = moves[0];
      for (const m of moves)
        if (m.score > best.score) best = m;
      return best;
    } else {
      // turno humano -> minimizar la puntuación
      let best = moves[0];
      for (const m of moves)
        if (m.score < best.score) best = m;
      return best;
    }
  };

  const best = minimax(board, computerName);
  return best.index != null ? best.index : emptyIndices[0];
};
