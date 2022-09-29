import React from 'react';

export default function Pagination({ offset, size, totalItems, changeOffset }) {
  const sizeToDisplay = totalItems < size ? totalItems : size;
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
      {offset + 1} to {offset + sizeToDisplay} of {totalItems}
      <span
        className='small-button'
        onClick={() => changeOffset(offset + size)}
      >
        ⏩
      </span>
    </div>
  );
}
