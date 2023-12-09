import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import './Header.css'
import config from './config';

const TMDB_API_KEY = config.TMDB_API_KEY;

export const Header = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  const [sidebar, setSidebar] = useState(false)

  const tmdbEndpoint = 'https://api.themoviedb.org/3/search/movie';

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `${tmdbEndpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      const movieSuggestions = data.results.map(result => result.title);
      setSuggestions(movieSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    if(searchTerm) {
      onSearch(searchTerm);
      setSearchTerm("");
      // setSuggestions([]);
      navigate(`/search?q=${searchTerm}`);
      

    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    fetchSuggestions(e.target.value);
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); 
    onSearch(suggestion); 
    setSearchTerm("");
    navigate(`/search?q=${suggestion}`);
  };

  const handleInputBlur = () => {
    // Hide suggestions when the input loses focus
    setSuggestions([]);
  };


  return (
    <>
        <div className="header flex flex-row p-5 justify-between mx-5 ">
            <div className="headerLeft flex gap-7">
                <Link to="/"><img className="header__icon h-8 w-14 mt-1.5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <form onSubmit={handleOnSubmit}>
                  <div className='search-bar-container'>
                    <input 
                    className="search" 
                    type='search' 
                    placeholder='Search...' 
                    value={searchTerm} 
                    onChange={handleOnChange}/>
                    {suggestions.length > 0 && (
                      <ul className='suggestions-list'>
                        {suggestions.map((suggestion, index) => (
                          <li key={index} className='suggestion' onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                </form>
            </div>
            <div className={`headerRight flex flex-row gap-10 ${sidebar ? "nav-links-sidebar" : "nav-links"}`}
onClick={() => setSidebar(false)}>
                <Link to="/" style={{textDecoration: "none"}}><span>Home</span></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>
            <button className='navbar-item-icon' onClick={() => setSidebar(!sidebar)}>
                {sidebar ? <MdOutlineClose /> : <MdMenu />}
            </button>
        </div>
    </>
  )
}
