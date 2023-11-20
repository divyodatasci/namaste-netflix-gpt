import React, { useState , useRef } from 'react';
import Header from './Header';
import { checkValidData } from './utils/validate';
import { auth } from './utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from './utils/UserSlice';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage]= useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick =() => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;

    if(message === null && !isSignIn){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('signed up', user);
        updateProfile(user, {
          displayName: name.current.value,
        })
        .then(() => {
          const {uid, email, displayName} = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,

            })
          );
        })
        .catch((error) => {
          setErrorMessage(errorMessage);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);
      });
    }
    else if(message=== null && isSignIn){
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('signed in', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);
      });
    }
  }
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  } 
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/c8f1b665-bd37-400d-950f-413cb99552ec/GB-en-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='logo'
        />
      </div>
      <div className='absolute z- bg-gradient-to-b from-black w-full h-full'></div>
      <form onSubmit = {(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black mt-60 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'> {isSignIn? 'Sign in' : 'Sign Up'} </h1>
        {!isSignIn && (
            <input 
          type='text'
          placeholder='Full Name'
          className='p-4 my-4 w-full bg-gray-700'
          ref={name}
        />)}
        <input 
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
          ref={email}
        />
        <input 
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
          ref={password}
        />
        <p className=' text-red-700'> {errorMessage} </p>
        <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg'>
        {isSignIn? 'Sign in' : 'Sign Up'}
        </button>
        <p className='py-6 cursor-pointer' onClick={toggleSignInForm}> {isSignIn ? 'New to Netflix? Sign up now' : 'Already Registered? Sign In Now'}</p>

      </form>
    </div>
  )
}

export default Login