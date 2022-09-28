import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonInfo, fetchPokemonList } from '../services/api';
import { updateFavoritePoke } from '../redux/user';
import PokemonCard from './PokemonCard';
import PokeSelected from './PokeSelected';

export default function Poke() {
  const [offset, setOffset] = useState();
  const [pokeObjectList, setPokeObjectList] = useState([]);
  const favoritePoke = useSelector((state) => state.user.favoritePoke);
  const dispatch = useDispatch();

  const createPokeObjectList = async (pokeList) => {
    const pokeDraftArray = [];
    const promiseArray = [];
    for (const pokemon of pokeList) {
      promiseArray.push(fetchPokemonInfo(pokemon.name));
    }
    const pokeResults = await Promise.allSettled(promiseArray);
    for (const pokeObj of pokeResults) {
      if (pokeObj.status === 'fulfilled') {
        pokeDraftArray.push(pokeObj.value?.data);
      }
    }
    pokeDraftArray.sort((a, b) => a.id - b.id);
    setPokeObjectList(pokeDraftArray);
    localStorage.setItem('pokeList', JSON.stringify(pokeDraftArray));
  };

  async function generatePokeMonList(offset) {
    const pokeList = await fetchPokemonList(offset);
    createPokeObjectList(pokeList.data.results);
  }

  useEffect(() => {
    if (localStorage.getItem('pokeList')) {
      const pokeObjectList = JSON.parse(localStorage.getItem('pokeList'));
      setPokeObjectList(pokeObjectList);
    } else {
      generatePokeMonList(0);
    }
  }, []);

  useEffect(() => {
    if (offset !== undefined) generatePokeMonList(offset);
  }, [offset]);

  const updateOffset = (value) => {
    let draftOffset = offset;
    if (!draftOffset) {
      draftOffset = pokeObjectList[0].id - 1;
    }
    setOffset(draftOffset + value);
  };

  return (
    <div>
      <div>Poke</div>
      {favoritePoke.name ? (
        <div>
          <div>Selected</div>
          <div>
            <button
              type='button'
              onClick={() => {
                dispatch(updateFavoritePoke({}));
              }}
            >
              Change Selection
            </button>
            <PokeSelected poke={favoritePoke} />
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              width: '80%',
              margin: '0 auto',
            }}
          >
            {pokeObjectList.map((poke) => (
              <PokemonCard key={poke.name} poke={poke} />
            ))}
          </div>
          <div>
            <button
              type='button'
              onClick={() => {
                updateOffset(-20);
              }}
            >
              prev
            </button>
            <button
              type='button'
              onClick={() => {
                updateOffset(20);
              }}
            >
              next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
