import React from 'react';
import './PokeSelected.scss';

export default function PokeSelected({ poke }) {
  const typeClass = poke.types?.[0]?.type?.name;

  return (
    <div className='poke-selected-wrap'>
      <div className='poke-image'>
        <img
          alt={poke.name}
          width='400px'
          className={typeClass}
          src={`${poke.sprites.other.dream_world.front_default}`}
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
  );
}
