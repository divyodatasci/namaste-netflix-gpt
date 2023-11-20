import React, { useEffect } from 'react';
import { auth } from './utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from './utils/UserSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
    // .then(() => {
    //   navigate("/");
    // })
    // .catch((error) => {
    //   navigate("/");
    // });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        navigate('/browse');
      }
      else{
        dispatch(removeUser());
        navigate('/');
      }
    })
  }, [ ]);
  return (
    <div className='absolute z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between w-full'>
        <img 
            className='w-44'
            src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
            alt='logo'>
        </img>
        {
          user &&  (
            <div className=' flex p-2'>
                <div className=' text-white font-bold text-lg p-4'> Hey, {user?.displayName} </div>
                <button onClick = {handleSignOut} className=' cursor-pointer bg-red-700 p-4 font-bold text-white'>
                  Sign Out
                </button>
            </div>
          )
        }
    </div>
  )
}

export default Header