import { useEffect } from 'react';
import { POPULAR_MOVIES_API_URL, API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const fetchMovieData = async (apiUrl, options) =>{
      fetch(apiUrl, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        dispatch ( addPopularMovies(response.results));
      })
      .catch(err => console.error(err));
    }
    useEffect(()=> {
      fetchMovieData(POPULAR_MOVIES_API_URL, API_OPTIONS);
    }, []);
}

export default usePopularMovies;