import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFavoritePoke } from '../redux/user';
import './PokeCard.scss';

export default function PokemonCard({ poke }) {
  const typeClass = poke.types?.[0]?.type?.name;
  const dispatch = useDispatch();

  const [isFavorite, setFavorite] = useState();
  return (
    <div className='poke-card-wrap'>
      <div
        onClick={() => {
          setFavorite(!isFavorite);
          dispatch(updateFavoritePoke(poke));
        }}
        className={`heart-icon ${isFavorite ? 'favorite' : ''}`}
      >
        {!isFavorite ? '🤍' : '❤️'}
      </div>
      <img
        alt='bulba'
        width='150px'
        height='150px'
        className={typeClass}
        src={`${poke.sprites.other.dream_world.front_default}`}
      />
      <div className='id'>#{poke.id}</div>
      <div className='name'>{poke.name}</div>
      <div className='types'>
        {poke.types.map((type) => (
          <span className={`type ${type.type.name}`}>{type.type.name}</span>
        ))}
      </div>
      <div></div>
    </div>
  );
}
