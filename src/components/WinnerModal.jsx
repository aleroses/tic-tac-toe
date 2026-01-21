import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { CHARACTERS } from '../constants';

export const WinnerModal = ({ winner, resetGame }) => {
  const { dispatch } = useContext(GameContext);

  if (winner === null) return null;

  const winnerCharacter =
    winner && CHARACTERS.find((c) => c.name === winner);

  const winnerText = winner
    ? `${winner} won!`
    : 'It’s a tie!';

  const handleClick = () => {
    resetGame();
  };

  return (
    <section
      className='winner'
      role='dialog'
      aria-modal='true'
      aria-label='Game result'
    >
      <div className='text'>
        <h2>{winnerText}</h2>

        {winnerCharacter && (
          <header
            className='win'
            aria-hidden={!winnerCharacter}
          >
            <img
              src={winnerCharacter.src}
              alt={winnerCharacter.name}
              className='winner-icon'
            />
          </header>
        )}

        {/* <footer className='modal-reset'>
          <button onClick={handleClick} autoFocus>
            Start over!!!
          </button>
        </footer> */}

        <footer className='modal-reset'>
          <button onClick={() => dispatch({ type: 'RESET' })}>
            Play again
          </button>

          <button
            onClick={() =>
              dispatch({ type: 'RESET_TO_MODE_SELECTOR' })
            }
          >
            Change game mode
          </button>
        </footer>
      </div>
    </section>
  );
};
