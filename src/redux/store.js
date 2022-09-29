import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import pokemonReducer from './pokemon';

const reducer = combineReducers({
  user: userReducer,
  pokemon: pokemonReducer,
});
export default configureStore({
  reducer,
  devTools: true,
});
