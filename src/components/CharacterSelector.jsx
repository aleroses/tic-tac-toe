import { useState } from 'react';
import { CHARACTERS } from '../constants';

export const CharacterSelector = ({
  label,
  setPlayer,
  excludeOpponent,
}) => {
  const [index, setIndex] = useState(0);

  const current = CHARACTERS[index];
  const next = CHARACTERS[(index + 1) % CHARACTERS.length];

  const nextCharacter = () => {
    let next = (index + 1) % CHARACTERS.length;

    // Evita repetir personaje que ya eligió el otro jugador
    // excludeOpponent = jugador 2 / 1

    while (CHARACTERS[next].name === excludeOpponent) {
      next = (next + 1) % CHARACTERS.length;
    }

    setIndex(next);
    setPlayer(CHARACTERS[next].name);
  };

  // const classes = `square ${isSelected ? 'is-selected' : ''}`;

  return (
    <div
      className='character-selector'
      onClick={nextCharacter}
    >
      <div className='character-current'>
        <img src={current.src} alt={current.name} />
      </div>

      <div className='character-next'>
        <img src={next.src} alt={next.name} />
      </div>

      <p className='label'>
        {label}: {current.name}
      </p>
    </div>
  );
};
