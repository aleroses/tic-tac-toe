export const LevelSelector = ({
  level,
  boxes,
  handleSize,
  // resetGame,
  active,
}) => {
  const handleClick = () => {
    handleSize(boxes);
    // resetGame();
  };

  return (
    <button
      className={`level ${active ? 'active-level' : ''}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={`Select ${level} (${boxes}x${boxes})`}
    >
      {level}
    </button>
  );
};
