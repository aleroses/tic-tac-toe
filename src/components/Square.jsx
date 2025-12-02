import { CHARACTERS } from '../constants';

export const Square = ({ handlePlay, index, square }) => {
  const handleClick = () => {
    handlePlay(index);
  };

  const character = CHARACTERS.find((c) => c.name === square);

  return (
    <button
      className='square'
      aria-label={`Square ${index + 1} ${
        character ? `occupied by ${character.name}` : 'empty'
      }`}
      onClick={handleClick}
    >
      {character ? (
        <img
          src={character.src}
          alt={character.name}
          className='character-icon'
        />
      ) : null}
    </button>
  );
};
