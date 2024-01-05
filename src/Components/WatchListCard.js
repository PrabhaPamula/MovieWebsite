import React from 'react'
import "./WatchListCard.css"

const IMG_API = "https://image.tmdb.org/t/p/w1280";

export const WatchListCard = ({id,title,poster_path,overview,vote_average,release_date,runtime,genres}) => {
  const setVoteClass = (vote) => {
    if(vote >= 8) {
      return "green";
    } else if(vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  }
  return (
    <>
    <div className='watchlist-component'>
        <div className='watchlist-card'>
            <div className='poster-img'>
                <img src={IMG_API+poster_path} alt={title}/>
            </div>
            <div className='watchlist-details'>
                <h1>{title}</h1>
                <p>{release_date} | {runtime} mins | {genres.map((g) => g.name).join(', ')}</p>
                <p className='para-rating'>Rate: <span className={`watchtag ${setVoteClass(vote_average)}`}>{vote_average}</span></p>
                <p>
                  {overview}
                </p>
            </div>
        </div>
    </div>
    
    </>
  )
}
