import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/UserSlice';
import { toggleGptSearchView } from "../utils/gptSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, [ ]);
  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };
  return (
    <div className='absolute z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between w-full'>
        <img 
            className='w-44'
            src={LOGO_URL}
            alt='logo'>
        </img>
        {
          user &&  (
            <div className=' flex p-2'>
              {showGptSearch && (
                <select
                  className="p-2 m-2 bg-gray-900 text-white"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                  className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
                  onClick={handleGptSearchClick}>
                  {showGptSearch ? "Homepage" : "GPT Search"}
                </button>
                <div className=' text-white font-bold text-lg p-4'> Hey, {user?.displayName} </div>
                <button onClick = {handleSignOut} className=' cursor-pointer bg-red-700 p-4 h-max w-max rounded-md font-bold text-sm text-white'>
                  Sign Out
                </button>
            </div>
          )
        }
    </div>
  )
}

export default Header;