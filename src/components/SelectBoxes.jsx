export const SelectBoxes = ({
  children,
  item,
  updateBoxes,
  resetGame,
}) => {
  const handleClick = () => {
    updateBoxes(item);
    resetGame();
  };

  return (
    <button
      className={`box box-${item}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
