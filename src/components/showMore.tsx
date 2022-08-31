import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Movie from "../types/movie_types";
import Filter from "./filter";

const ShowMore = (props: any) => {
    const [showMoreMovies, setShowMoreMovies] = useState([]);
    const { from } = useParams();
  const navigate = useNavigate();
  let handleMovieClick = (movieId: number) =>
    navigate("/movieDetails/" + movieId);
  const filterByGenre = (movies: any) => {
    //If no filters are active, return all movies
    if (Object.values(props.filters).every((value) => value === false)) {
      return movies;
    }
    //Awkward workaround for different property names coming from different calls,
    //to be fixed
    return movies.filter((movie: any) => {
      if (movie.genres) {
        return movie.genres.some((genre: any) => {
          return props.filters[genre.id] === true;
        });
      } else {
        return movie.genre_ids.some((genre_id: any) => {
          return props.filters[genre_id] === true;
        });
      }
    });
  };
  let displayMovies = (movies: any) => {
    return movies.map((movie: Movie) => (
      <span
        className="col show-more-col movie-span"
        key={movie.id}
        onClick={() => handleMovieClick(movie.id)}
      >
        <img
          className="movie-img"
          src={
            props.config.base_url +
            props.config.file_sizes.config_file_size_medium +
            movie.poster_path
          }
          alt={movie.title}
        ></img>
      </span>
    ));
  };
  //Set display data based on url param
  useEffect(() => {
    if (from === "search") {
      setShowMoreMovies(props.searchMovies);
    } else {
      setShowMoreMovies(props.favorites);
    }
  }, [from]);

  return (
    <>
      <div id="show-more-container">
        {!!props.genres && (
          <Filter
            filters={props.filters}
            setFilters={props.setFilters}
            genres={props.genres}
          ></Filter>
        )}
        <div id="show-more-movies">
          {!!showMoreMovies.length &&
            displayMovies(filterByGenre(showMoreMovies))}
        </div>
      </div>
    </>
  );
};
export default ShowMore;
