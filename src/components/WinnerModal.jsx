import { CHARACTERS } from '../constants';

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerCharacter =
    winner && CHARACTERS.find((c) => c.name === winner);

  const winnerText = winner
    ? `${winner} won!`
    : 'It’s a tie!';

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {/* {winner && <Square>{winner}</Square>} */}
          {winnerCharacter && (
            <img
              src={winnerCharacter.src}
              alt={winnerCharacter.name}
              className='winner-icon'
            />
          )}
        </header>

        <footer className='modal-reset'>
          <button onClick={resetGame}>Start over!!!</button>
        </footer>
      </div>
    </section>
  );
};
