import { createSlice } from '@reduxjs/toolkit';

async function saveToLocalStorage(key, value) {
  await localStorage.setItem(key, value);
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokeDataMap: {},
    pokeIdMap: [],
  },
  reducers: {
    initializePokeIdMap: (state, action) => {
      state.pokeIdMap = action.payload;
      setTimeout(() =>
        localStorage.setItem('pokeIdMap', JSON.stringify(action.payload))
      );
    },
    initializePokeDataMap: (state, action) => {
      state.pokeDataMap = action.payload;
    },
    updatePokeDataMap: (state, action) => {
      state.pokeDataMap[action.payload.key] = action.payload.value;
      saveToLocalStorage('pokeDataMap', JSON.stringify(state.pokeDataMap));
    },
    flashNewPokeDataMap: (state, action) => {
      state.pokeDataMap = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializePokeDataMap,
  updatePokeDataMap,
  initializePokeIdMap,
  flashNewPokeDataMap,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
