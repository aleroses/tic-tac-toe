export const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
}) => {
  const classes = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={classes}>
      {children}
    </div>
  );
};
