import { useEffect, useState } from 'react';
import { CHARACTERS } from '../constants';

export const CharacterSelector = ({
  label,
  current,
  setPlayer,
  excludeOpponent,
}) => {
  const initialIndex = Math.max(
    0,
    CHARACTERS.findIndex((c) => c.name === current)
  );
  const [index, setIndex] = useState(initialIndex === -1 ? 0 : initialIndex);

  useEffect(() => {
    // si el current cambia desde fuera, sincronizamos
    const idx = CHARACTERS.findIndex((c) => c.name === current);

    if (idx >= 0 && idx !== index) setIndex(idx);
  }, [current]);

  const characterLength = CHARACTERS.length;
  const currentCharacter = CHARACTERS[index];
  const next = CHARACTERS[(index + 1) % characterLength];

  const nextCharacter = () => {
    let next = (index + 1) % characterLength;

    // Evita repetir personaje que ya eligió el otro jugador
    // excludeOpponent = jugador 2 / 1

    let loops = 0;
    while (
      CHARACTERS[next].name === excludeOpponent &&
      loops < characterLength
    ) {
      next = (next + 1) % characterLength;
      loops++;
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
        <img src={currentCharacter.src} alt={currentCharacter.name} />
      </div>

      <div className='character-next'>
        <img src={next.src} alt={next.name} />
      </div>

      <p className='label'>
        {label}: {currentCharacter.name}
      </p>
    </div>
  );
};
