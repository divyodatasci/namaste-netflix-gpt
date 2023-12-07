import { useEffect } from 'react';
import { NOWPLAYING_MOVIES_API_URL, API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const fetchMovieData = async (apiUrl, options) =>{
      fetch(apiUrl, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        dispatch ( addNowPlayingMovies(response.results));
      })
      .catch(err => console.error(err));
    }
    useEffect(()=> {
      fetchMovieData(NOWPLAYING_MOVIES_API_URL, API_OPTIONS);
    }, []);
}

export default useNowPlayingMovies;