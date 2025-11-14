export const LevelSelector = ({
  level,
  boxes,
  updateBoxes,
  resetGame,
  active,
}) => {
  const handleClick = () => {
    updateBoxes(boxes);
    resetGame();
  };

  return (
    <button
      className={`level box-${boxes} ${
        active ? 'active-level' : ''
      }`}
      onClick={handleClick}
    >
      {level}
    </button>
  );
};

/* 
SelectBoxes
LevelSelector
*/
