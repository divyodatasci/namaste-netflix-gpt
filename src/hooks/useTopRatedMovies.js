import { useEffect } from 'react';
import { TOPRATED_MOVIES_API_URL, API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const fetchMovieData = async (apiUrl, options) =>{
      fetch(apiUrl, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        dispatch ( addTopRatedMovies(response.results));
      })
      .catch(err => console.error(err));
    }
    useEffect(()=> {
      fetchMovieData(TOPRATED_MOVIES_API_URL, API_OPTIONS);
    }, []);
}

export default useTopRatedMovies;