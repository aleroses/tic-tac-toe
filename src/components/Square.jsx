export const Square = ({ children, updateBoard, index }) => {
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
