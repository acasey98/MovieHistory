import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovie = movieObject => axios.post(`${firebaseUrl}/movies.json`, movieObject);

export default { addNewMovie };
