import axios from 'axios';

const pokeBaseURL = 'https://pokeapi.co/api/v2/';

const fetchPokemonList = (offset = 0, number = 20) => {
  return axios.get(`${pokeBaseURL}pokemon?limit=${number}&offset=${offset}`);
};

const fetchPokemonInfo = (name) => {
  return axios.get(`${pokeBaseURL}pokemon/${name}`);
};

const postUserDetails = (payload) => {
  return axios.post('https://jsonplaceholder.typicode.com/posts', {
    ...payload,
  });
};

export { fetchPokemonList, fetchPokemonInfo, postUserDetails };
