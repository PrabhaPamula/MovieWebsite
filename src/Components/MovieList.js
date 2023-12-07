import React, { useEffect, useState } from 'react'
import { MovieCard } from './MovieCard';
import './MovieList.css'
import { useParams } from 'react-router-dom';
import config from './config';

const TMDB_API_KEY = config.TMDB_API_KEY;

export const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const {type} = useParams();

    const DEFAULT_FEATURED_API =`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${TMDB_API_KEY}&language=en-US`;

    const getMovies = (API) => {
        fetch(API)
        .then((res) => res.json())
        .then((data) => {
            setMovieList(data.results);
        })
    }
    console.log(movieList);

    useEffect(() => {
        if(type !== 'search') {
            getMovies(DEFAULT_FEATURED_API);
        }
    },[type])

   

    //2nd time for navigating popular, top_rated, etc working properly
    // useEffect(() => {
    //     getData();
    // },[])

    // useEffect(() => {
    //     getData();
    // },[type])

    // const getData = () => {
    //     fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=3362e13b6c276e43bf2ec6e5b12f4e5b&language=en-US`)
    //     .then((res) => res.json())
    //     .then((data) => setMovieList(data.results))
    // }


//original - initial code
    // useEffect(() => {
    //     fetch("https://api.themoviedb.org/3/movie/popular?api_key=3362e13b6c276e43bf2ec6e5b12f4e5b&language=en-US")
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         setMovieList(data.results);
    //     })
    // }, [])

  return (
    <>
    <div className='movie-list-conatiner'>
        {
            movieList.map((movie) => (
                <MovieCard key={movie.id} {...movie}/>
            ))
        }
    </div>
    </>
  )
}
