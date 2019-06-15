import firebase from 'firebase/app';
import 'firebase/auth';

import movieData from '../../helpers/data/movieData';

import userMovieData from '../../helpers/data/userMovieData';

import util from '../../helpers/util';

const addToWatchlistEvent = (e) => {
  const movId = e.target.id;
  let watchStatus = false;
  if (movId.split('.')[0] === 'rate') {
    watchStatus = true;
  }
  const newUserMovie = {
    userId: firebase.auth().currentUser.uid,
    movieId: movId.split('.')[1],
    hasWatched: watchStatus,
    starRating: 5,
  };
  console.error(newUserMovie);
  userMovieData.addNewUserMovie(newUserMovie);
};

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    title: document.getElementById('title').value,
    contentRating: document.getElementById('content-rating').value,
    director: document.getElementById('director').value,
  };
  movieData.addNewMovie(newMovie)
    .then(() => {
      // document.getElementById('title').value = '';
      // document.getElementById('content-rating').value = '';
      // document.getElementById('director').value = '';
      // document.getElementById('movies').classList.remove('hide');
      // document.getElementById('new-movie').classList.add('hide');
      window.location.reload();
    })
    .catch(err => console.error('no new movie', err));
};

const newMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

const userMovies = (movie) => {
  const userMoviesData = userMovieData.getUserMovieData();
  let domString = '';
  Object.keys(userMoviesData).forEach((userMovie) => {
    if (userMovie.movieId === movie.id && userMovie.userId === firebase.auth().currentUser.uid) {
      if (userMovie.hasWatched === true) {
        domString += '<p>User Rating: 5 </p>';
      } else
      if (userMovie.hasWatched === false) {
        domString += '<p>On Watchlist</p>';
      }
    }
    // Axios.post?
  });
  return (domString);
};

const showMovies = () => {
  movieData.getMovieData().then((movies) => {
    let domString = '';
    const movieValues = Object.values(movies);
    movieValues.forEach((movie) => {
      domString += `<h3>${movie.title}</h3>`;
      domString += `<p>${movie.contentRating}</p>`;
      domString += `<p>${movie.director}</p>`;
      domString += `<button type="submit" id="watchlist.${movie.id}" class="watchlist-btn btn-primary">Add To Watchlist</button>`;
      domString += `<button type="submit" id="rate.${movie.id}" class="rate-btn btn-primary">Rate Movie</button>`;
      domString += userMovies(movie);
    });
    util.printToDom('movies', domString);
    domString = '<button id="add-movie-button" class="btn btn-secondary">Add Movie</button>';
    util.printToDom('movie-add', domString);
    document.getElementById('add-movie-button').addEventListener('click', newMovieButton);

    const watchlistButtons = document.getElementsByClassName('watchlist-btn');
    for (let i = 0; i < watchlistButtons.length; i += 1) {
      watchlistButtons[i].addEventListener('click', addToWatchlistEvent);
    }
    const rateButtons = document.getElementsByClassName('rate-btn');
    for (let i = 0; i < rateButtons.length; i += 1) {
      rateButtons[i].addEventListener('click', addToWatchlistEvent);
    }
  })
    .catch(err => console.error('couldnt get movies', err));
};

export default { showMovies };
