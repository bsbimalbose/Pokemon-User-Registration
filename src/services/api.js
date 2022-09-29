import axios from 'axios';

const pokeBaseURL = 'https://pokeapi.co/api/v2/';

const fetchPokemonList = (offset = 0, number = 10000) => {
  return axios.get(`${pokeBaseURL}pokemon?limit=${number}&offset=${offset}`);
};

const fetchPokemonInfo = (name) => {
  return axios.get(`${pokeBaseURL}pokemon/${name}`);
};

const fetchAllPokemonNames = () => {
  return axios.get(`${pokeBaseURL}pokemon?limit=100000&offset=0`);
};

const postUserDetails = (payload) => {
  return axios.post('https://jsonplaceholder.typicode.com/posts', {
    ...payload,
  });
};

export {
  fetchAllPokemonNames,
  fetchPokemonList,
  fetchPokemonInfo,
  postUserDetails,
};
