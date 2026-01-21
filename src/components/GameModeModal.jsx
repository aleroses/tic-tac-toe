import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { getRandomCharacter } from '../logic/ai';

export const GameModeModal = () => {
  const { state, dispatch } = useContext(GameContext);

  const selectPVP = () => {
    dispatch({
      type: 'SET_GAME_MODE',
      payload: { mode: 'PVP' },
    });
  };

  const selectPVC = (level) => {
    // const computerCharacter = getRandomCharacter(
    //   state.player1
    // );

    dispatch({
      type: 'SET_GAME_MODE',
      payload: {
        mode: 'PVC',
        aiLevel: level,
        // computerCharacter,
      },
    });
  };

  return (
    <section
      className='winner'
      role='dialog'
      aria-modal='true'
    >
      <div className='text'>
        <h2>Select Game Mode</h2>

        <button onClick={selectPVP}>Player vs Player</button>

        <div style={{ marginTop: '1rem' }}>
          <p>Player vs Computer</p>
          <button onClick={() => selectPVC('easy')}>
            Easy
          </button>
          <button onClick={() => selectPVC('medium')}>
            Medium
          </button>
          <button onClick={() => selectPVC('hard')}>
            Hard
          </button>
        </div>
      </div>
    </section>
  );
};
