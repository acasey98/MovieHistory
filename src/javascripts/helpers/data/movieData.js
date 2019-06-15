import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMovieData = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json`) // ?orderBy="uid"&equalTo="${uid}"
    .then((results) => {
      const movieResults = results.data;
      const movies = [];
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        movies.push(movieResults[movieId]);
      });
      resolve(movies);
    })
    .catch(err => reject(err));
});

const addNewMovie = movieObject => axios.post(`${firebaseUrl}/movies.json`, movieObject);

// const createUserMovies = uid => new Promise((resolve, reject) => {
//   axios.get(`${firebaseUrl}/movies.json`)
//     .then((results) => {
//       const movieResults = results.data;
//       const movies = [];

//       (movieResults).forEach((movieId) => {
//         movieResults[MOvieId].id = MovieId;
//         movies.push(movieResults[MovieId]);
//       });
//       resolve(movies);
//     })
//     .catch(err => reject(err));
// });

export default { addNewMovie, getMovieData/* , createUserMovies */ };
