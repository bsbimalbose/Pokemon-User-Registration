import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  initializePokeIdMap,
  initializePokeDataMap,
  flashNewPokeDataMap,
} from '../redux/pokemon';
import { fetchAllPokemonNames } from './../services/api';
import Footer from './Footer';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';
import PokeSelected from './PokeSelected';

export default function PokeDex() {
  const pokeIdMapList = useSelector((state) => state.pokemon.pokeIdMap);
  const favoritePoke = useSelector((state) => state.user.favoritePoke);

  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  let navigate = useNavigate();

  async function generatePokeMonDataDumpAndIdMap() {
    const pokeIdMapDraft = [];
    const pokeInitialDataMap = {};
    const res = await fetchAllPokemonNames();
    const pokeNameList = res.data.results;
    for (let i = 0; i < pokeNameList.length; i++) {
      const pokeMon = pokeNameList[i];
      pokeIdMapDraft.push(pokeMon.name);
      pokeInitialDataMap[pokeMon.name] = null;
    }

    dispatch(initializePokeIdMap(pokeIdMapDraft));
    dispatch(initializePokeDataMap(pokeInitialDataMap));
  }

  useEffect(() => {
    if (pokeIdMapList.length === 0) {
      const savedPokeIdMap = localStorage.getItem('pokeIdMap');

      if (savedPokeIdMap) {
        dispatch(initializePokeIdMap(JSON.parse(savedPokeIdMap)));
        const pokeDataMap = localStorage.getItem('pokeDataMap');
        if (savedPokeIdMap) {
          dispatch(flashNewPokeDataMap(JSON.parse(pokeDataMap)));
        }
      } else {
        generatePokeMonDataDumpAndIdMap();
      }
    }
  }, []);

  const listToGoThrough = keyword
    ? pokeIdMapList.filter((pokemonName) =>
        pokemonName.toLowerCase().includes(keyword)
      )
    : pokeIdMapList;
  return (
    <div>
      {favoritePoke.name ? (
        <div>
          <PokeSelected poke={favoritePoke} showChangeSelection />
          <div className='footer-wrap'>
            <button
              type='button'
              className='button'
              onClick={() => {
                navigate('/review');
              }}
            >
              Continue ➩
            </button>
          </div>
        </div>
      ) : (
        <>
          {' '}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            Pokedex
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              className='text-field'
              style={{ width: '500px' }}
              label='Search by Name'
              variant='outlined'
              onChange={(e) => {
                setKeyword(e.target.value.trim().toLowerCase());
                setOffset(0);
              }}
            />
          </Box>
          <Pagination
            offset={offset}
            size={20}
            totalItems={listToGoThrough.length}
            changeOffset={(offset) => setOffset(offset)}
          />
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
            {listToGoThrough.slice(offset, offset + 20).map((pokeName) => (
              <PokemonCard key={pokeName} pokeName={pokeName} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
