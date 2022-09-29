import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFavoritePoke } from '../redux/user';
import './PokeSelected.scss';

export default function PokeSelected({ poke, showChangeSelection }) {
  const typeClass = poke.types?.[0]?.type?.name;
  const dispatch = useDispatch();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          marginTop: showChangeSelection ? '20px' : 0,
        }}
      >
        <h2>
          Your favorite Pokemon is{' '}
          <span style={{ textTransform: 'capitalize', margin: '0' }}>
            {poke.name}
          </span>
          !
        </h2>
        {showChangeSelection ? (
          <button
            type='button'
            className='button red'
            onClick={() => {
              dispatch(updateFavoritePoke({}));
            }}
          >
            Change Selection
          </button>
        ) : null}
      </div>

      <div className='poke-selected-wrap'>
        <div className='poke-image'>
          <img
            alt={poke.name}
            width='400px'
            className={typeClass}
            src={`${poke.sprite}`}
          />
        </div>
        <div className='poke-details'>
          <div className='id'>
            #{poke.id}
            <h4 className='name'>{poke.name}</h4>
          </div>

          <div className='body-dimensions'>
            <span>Height: {poke.height * 10} cm</span>
            <span>Weight: {poke.weight / 10} kg</span>
          </div>
          <div className='types'>
            Type:
            {poke.types.map((type) => (
              <span className={`type ${type.type.name}`}>{type.type.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
