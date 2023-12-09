import React, { useState, useEffect } from 'react'
import { MovieCard } from './MovieCard';
import config from './config';

const TMDB_API_KEY = config.TMDB_API_KEY;


export const SearchList = ({searchQuery}) => {
    const [movieList, setMovieList] = useState([]);
    console.log(searchQuery);

    const getMovies = (API) => {
        try {
            fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setMovieList(data.results);
            })
        }
        catch(error) {
            console.error("Error fetching data",error);
        }
        
    }
    const SEARCH_API=`https://api.themoviedb.org/3/search/movie?&api_key=${TMDB_API_KEY}&query=`;

    useEffect(() => {
        if(searchQuery) {
            getMovies(SEARCH_API+searchQuery);
        } 
    },[searchQuery])
    
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
