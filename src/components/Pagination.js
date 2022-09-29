import React from 'react';

export default function Pagination({ offset, size, totalItems, changeOffset }) {
  const sizeToDisplay = totalItems < size ? totalItems : size;
  const toSize = offset + sizeToDisplay;
  const toSizeToDisplay = toSize > totalItems ? totalItems : toSize;
  return (
    <div className='flex-right pdr-40'>
      {offset > 0 ? (
        <span
          className='small-button'
          onClick={() => changeOffset(offset - size)}
        >
          ⏪
        </span>
      ) : null}
      {offset + 1} to {toSizeToDisplay} of {totalItems}
      {offset + size < totalItems ? (
        <span
          className='small-button'
          onClick={() => changeOffset(offset + size)}
        >
          ⏩
        </span>
      ) : null}
    </div>
  );
}
