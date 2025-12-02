export const LevelSelector = ({
  level,
  boxes,
  handleSize,
  active,
}) => {
  const handleClick = () => {
    handleSize(boxes);
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
