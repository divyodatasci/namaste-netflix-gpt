import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
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
      <form className='w-3/12 absolute p-12 bg-black mt-60 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'> {isSignIn? 'Sign in' : 'Sign Up'} </h1>
        {!isSignIn && (
            <input 
          type='text'
          placeholder='Full Name'
          className='p-4 my-4 w-full bg-gray-700'
        />)}
        <input 
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <input 
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>
        {isSignIn? 'Sign in' : 'Sign Up'}
        </button>
        <p className='py-6 cursor-pointer' onClick={toggleSignInForm}> {isSignIn ? 'New to Netflix? Sign up now' : 'Already Registered? Sign In Now'}</p>

      </form>
    </div>
  )
}

export default Login