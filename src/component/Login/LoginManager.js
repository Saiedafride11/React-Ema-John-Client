import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }else {
      firebase.app(); // if already initialized, use that one
    }
}

export const handleGoogleSignIn = () =>{
    // console.log("handleSignIn");
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      return signedInUser
      // console.log(displayName, email, photoURL)
      // console.log(res)
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


 export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      console.log('Facebook User', res)
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential)
    });
  }


  export const handleSignOut = () => {
    // console.log("handleSignOut");
    return firebase.auth().signOut()
    .then(res => {
      const isSignedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      return isSignedOutUser
    })
    .catch(err => {
      
    });
    
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      // console.log(res);
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name)
      return newUserInfo;
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.error(errorCode, errorMessage)

      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }


  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('Update User Name Succesfully')
    }).catch(function(error) {
      console.log(error)
    });
  }