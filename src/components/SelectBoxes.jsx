export const SelectBoxes = ({
  children,
  item,
  updateBoxes,
  resetGame,
  active,
}) => {
  const handleClick = () => {
    console.log('click: ', item);

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
