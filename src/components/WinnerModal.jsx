import { Square } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerText = winner === false ? "Tie" : `Won`;

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>
            Start over!!!
          </button>
        </footer>
      </div>
    </section>
  );
};
