import { useState } from 'react';
import { CHARACTERS } from '../constants';

export const CharacterSelector = ({
  label,
  setPlayer,
  excludeOpponent,
}) => {
  const [index, setIndex] = useState(0);

  const characterLength = CHARACTERS.length;
  const currentCharacter = CHARACTERS[index];
  const next = CHARACTERS[(index + 1) % characterLength];

  const nextCharacter = () => {
    let next = (index + 1) % characterLength;

    // Avoid repeating the character already chosen by the other player
    // excludeOpponent = jugador 2 / 1

    while (CHARACTERS[next].name === excludeOpponent) {
      next = (next + 1) % characterLength;
    }

    setIndex(next);
    setPlayer(CHARACTERS[next].name);
  };

  return (
    <div
      className='character-selector'
      aria-label={label}
      onClick={nextCharacter}
    >
      <div className='character-current'>
        <img
          src={currentCharacter.src}
          alt={currentCharacter.name}
        />
      </div>

      <div className='character-next'>
        <img src={next.src} alt={next.name} />
      </div>

      <p className='label'>
        {/* {label}:  */}
        {currentCharacter.name}
      </p>
    </div>
  );
};
