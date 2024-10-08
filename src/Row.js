import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {

    async function fetchData() {
      const request = await axios.get(fetchURL);
      // console.log(request.data.results);
      setMovies(request.data.results);
      // return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      console.log(trailerUrl);

      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className='row'>
      {/* title */}
      <h2>{title}</h2>

      {/* Container Poster */}
      <div className='row__posters'>
        {movies.map(movie => (
          <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} onClick={handleClick(movie)} />
        ))}
      </div>

      {trailerUrl && <YouTube videoId="" opts={opts} />}
    </div>
  )
}

export default Row