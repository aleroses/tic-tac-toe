export const MachineSelector = () => {
  return (
    <div className='machine-options'>
      {/* Botón para jugar contra la computadora */}
      <button
        className='vs-computer'
        onClick={() =>
          // ponemos player2 a 'Computer' (nombre que usará la IA)
          setPlayer('player2', 'Computer')
        }
        title='Play vs Computer'
      >
        Play vs Computer
      </button>

      {/* Selector de dificultad */}
      {/* <label>Difficulty:</label> */}
      <select
        // value={state.aiLevel}
        onChange={(e) =>
          dispatch({
            type: 'SET_AI_LEVEL',
            payload: e.target.value,
          })
        }
      >
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>
    </div>
  );
};
