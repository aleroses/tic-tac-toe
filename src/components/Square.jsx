export const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
}) => {
  // const classes = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className='square'>
      {children ? (
        <img
          src={children.src}
          alt={children.name}
          className='character-icon'
        />
      ) : null}
    </div>
  );
};
