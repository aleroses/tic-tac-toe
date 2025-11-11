export const SelectBoxes = ({
  children,
  item,
  updateBoxes,
  resetGame,
  active,
}) => {
  const handleClick = () => {
    updateBoxes(item);
    resetGame();
  };

  return (
    <button
      className={`box box-${item} ${
        active ? 'active-level' : ''
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
