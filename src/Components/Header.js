import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

export const Header = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(searchTerm) {
      onSearch(searchTerm);
      setSearchTerm("");
      navigate(`/search?q=${searchTerm}`);

    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
        <div className="header flex flex-row p-5 justify-between mx-5 ">
            <div className="headerLeft flex gap-7">
                <Link to="/"><img className="header__icon h-8 w-14 mt-1.5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <form onSubmit={handleOnSubmit}>
                  <input 
                  className="search" 
                  type='search' 
                  placeholder='Search...' 
                  value={searchTerm} 
                  onChange={handleOnChange}/>
                </form>
            </div>
            <div className="headerRight flex gap-10">
              <Link to="/" style={{textDecoration: "none"}}><span>Home</span></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>
        </div>
    </>
  )
}
