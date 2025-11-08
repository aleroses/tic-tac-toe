import { CHARACTERS } from '../constants';
// import { Square } from './Square';

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerCharacter =
    winner &&
    CHARACTERS.find(
      (c) => c.name.toLowerCase() === winner.toLowerCase()
    );

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

        <footer>
          <button onClick={resetGame}>Start over!!!</button>
        </footer>
      </div>
    </section>
  );
};
