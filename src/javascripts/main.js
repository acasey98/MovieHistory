import 'bootstrap';
import '../styles/main.scss';

import firebase from 'firebase/app';

import apiKeys from './helpers/apiKeys';

import auth from './components/auth/auth';

import navbar from './components/myNavbar/myNavbar';

import authData from './helpers/data/authData';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authPrintToDom('auth');
  navbar.navbarEvents();
  authData.checkLoginStatus();
};

init();
