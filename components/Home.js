import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import "antd/dist/antd.css";
import Movie from "./Movie";
import { response } from "../../backend/app";

function Home() {
  const [moviesLists, setMoviesList] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/movies')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(moviesLists)
  //     });
  //     setMoviesList(data)
  // }, [])

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setListMoviesApi(data.movies)
        const movieDescription = data.movies.results.map(movie => {
          const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          let overview = movie.overview
          if (overview.length > 100) {
            overview = overview.substr(0, 100) + '...'
          }
          return {title: movie.title, vote_average: movie.vote_average, overview, vote_count: movie.vote_count, poster}
        });
        setMoviesList(movieDescription);
      });
    }, []);
    
    const movies = moviesLists.map(data => {
      return (
        <Movie
        className={styles.movieCard}
        title={data.title}
        vote_average={data.vote_average}
        overview={data.overview}
        voteCount={data.vote_count}
        poster={data.poster}
        isLiked={isLiked}
        />
        );
      });

  const moviesList = (
    <div className={styles.movieListPop}>
      <span>Movie 1</span>
      <span>Movie 2</span>
      <span>Movie 3</span>
      <span>Movie 4</span>
    </div>
  );

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.navigation}>
          <div className={styles.LogoContainer}>
            <img src="logo.png" height="30vh" />
            <img src="logoletter.png" width="100vw" />
          </div>
          <Popover
            content={moviesList}
            title="Title"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            {/* <Button type="primary" handleSubmit={handleSubmit}>Movies Liked</Button> */}
          </Popover>
        </div>
        <h2 style={{ padding: "2em" }}>Last Releases</h2>
        <div className={styles.movieGrid}>{movies}</div>
      </main>
    </div>
  );
}

export default Home;
