import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewUserMovie = userMovieObject => axios.post(`${firebaseUrl}/userMovies.json`, userMovieObject);

const getUserMovieData = () => axios.get(`${firebaseUrl}/userMovies.json`);

export default { addNewUserMovie, getUserMovieData };
