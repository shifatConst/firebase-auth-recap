import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [user, setUser] = useState({})
  const provider = new firebase.auth.GoogleAuthProvider();
  const FbProvider = new firebase.auth.FacebookAuthProvider();
  var GhProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  }
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(FbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb user', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  const handleGhSignIn = () => {
    firebase
  .auth()
  .signInWithPopup(GhProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
    console.log('user info', user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <br />
      <button onClick={handleFbSignIn}>Sign In with Facebook</button>
      <br />
      <button onClick={handleGhSignIn}>Sign In with Github</button>
      <p>User: {user.displayName}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
