import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import googleImg from './googleBtn.png';


const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const authPrintToDom = () => {
  let domString = '<button id="google-auth" class="btn btn-secondary">';
  domString += `<img src=${googleImg} />`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authPrintToDom };
