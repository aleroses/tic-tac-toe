import { CHARACTERS } from '../constants';

export const Square = ({
  handlePlay,
  index,
  square,
  disabled,
}) => {
  const character = CHARACTERS.find((c) => c.name === square);

  return (
    <button
      className='square'
      aria-label={`Square ${index + 1} ${
        character ? `occupied by ${character.name}` : 'empty'
      }`}
      disabled={disabled || !!character}
      onClick={() => handlePlay(index)}
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
