// import firebase from 'firebase/app';
// import 'firebase/auth';

import movieData from '../../helpers/data/movieData';

import util from '../../helpers/util';

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    title: document.getElementById('title').value,
    contentRating: document.getElementById('content-rating').value,
    director: document.getElementById('director').value,
  };
  movieData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('title').value = '';
      document.getElementById('content-rating').value = '';
      document.getElementById('director').value = '';
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('new-movie').classList.add('hide');
    })
    .catch(err => console.error('no new movie', err));
};

const newMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

const showMovies = () => {
  const domString = '<button id="add-movie-button" class="btn btn-secondary">Add Movie</button>';
  util.printToDom('movies', domString);
  document.getElementById('add-movie-button').addEventListener('click', newMovieButton);
};

export default { showMovies };
