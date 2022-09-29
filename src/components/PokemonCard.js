import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePokeDataMap } from '../redux/pokemon';
import { updateFavoritePoke } from '../redux/user';
import { fetchPokemonInfo } from '../services/api';
import './PokemonCard.scss';

export default function PokemonCard({ pokeName }) {
  const pokeDataMap = useSelector((state) => state.pokemon.pokeDataMap);

  const pokeObj = pokeDataMap[pokeName];
  const typeClass = pokeObj?.types?.[0]?.type?.name;
  const dispatch = useDispatch();

  async function fetchPokemonObject() {
    const res = await fetchPokemonInfo(pokeName);
    const { name, height, weight, types, id, sprites } = res.data;
    dispatch(
      updatePokeDataMap({
        key: pokeName,
        value: {
          name,
          height,
          weight,
          types,
          id,
          sprite:
            sprites?.other?.dream_world?.front_default || sprites.front_default,
        },
      })
    );
  }

  useEffect(() => {
    if (!pokeObj) {
      fetchPokemonObject();
    }
  }, []);

  const [isFavorite, setFavorite] = useState();
  return !pokeObj ? (
    <div className='poke-card-wrap'>loading... </div>
  ) : (
    <div className='poke-card-wrap'>
      <div
        onClick={() => {
          setFavorite(!isFavorite);
          dispatch(updateFavoritePoke(pokeObj));
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
        src={`${pokeObj.sprite}`}
      />
      <div className='id'>#{pokeObj.id}</div>
      <div className='name'>{pokeObj.name}</div>
      <div className='types'>
        {pokeObj.types.map((type) => (
          <span key={type.type.name} className={`type ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
      <div></div>
    </div>
  );
}
