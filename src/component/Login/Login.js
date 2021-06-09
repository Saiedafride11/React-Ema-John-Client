import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true)
        })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
        handleResponse(res, true)
    })
 }

  const signOut = () =>{
    handleSignOut()
    .then(res => {
        handleResponse(res, false)
    })
  }

  
  const handleResponse = (res, redirect) => {
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
        history.replace(from);
    }
  }
  

  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    // debugger;
    let isFieldValid = true;
    if(event.target.name == 'email') {
      // const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid)
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name == 'password'){
      const passwordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value)
      // console.log(passwordValid && passwordHasNumber)
      isFieldValid = passwordValid && passwordHasNumber
    }
    if(isFieldValid){
      // [...cart, newCart] (ema john simple example)
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      // console.log('Submit');
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
    })
     
    }

    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword( user.email, user.password)
        .then(res => {
            handleResponse(res, true)
        })
        
    }
    e.preventDefault();
  }

  
  return (
    <div style={{textAlign: 'center', marginTop:'30px'}}>
        { user.isSignedIn ? <button onClick={signOut} >Sign Out</button> :
          <button onClick={googleSignIn} >Sign In</button>
        }
        <br />
        <button onClick={fbSignIn}>Sign In Using Facebook</button>
        {
          user.isSignedIn && <div>
              <p>WelCome, {user.name}</p>
              <p>Email {user.email}</p>
              <img src={user.photo} alt="" ></img >
          </div>
        }
        <h1>Our Own Authentication</h1>
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}

        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User Sign Up</label>

        <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}
        <br />
          {/* <input type="text" name="email" onChange={handleChange} placeholder="Enter Email Address" required/> */}
          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Email Address" required/>
          <br />
          {/* <input type="password" name="password" onChange={handleChange} placeholder="Enter Password" required/> */}
          <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Password" required/>
          <br />
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
        </form>

        <p style={{color: 'red'}}>{user.error}</p>
        { user.success && <p style={{color: 'green'}}>User {newUser ? 'Create' : 'LogIn'} A Succesfully</p>}
    </div>
  );
}

export default Login;