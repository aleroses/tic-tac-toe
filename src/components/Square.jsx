export const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
  // board,
  // turn,
  // winner,
  // size,
  // setBoard,
  // setTurn,
  // setWinner,
}) => {
  const classes = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(
      index
      // board,
      // turn,
      // winner,
      // size,
      // setBoard,
      // setTurn,
      // setWinner
    );
  };

  return (
    <div onClick={handleClick} className={classes}>
      {children}
    </div>
  );
};
