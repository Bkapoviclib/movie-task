import Movie from "../types/movie_types";
import MovieList from "./movieList";
const HomePage = (props: any) => {
  return (
    <div className="container-fluid">
      {props.movies &&
        props.movies.map((movie: Movie, index: number) => (
          <MovieList
            key={movie.id}
            movies={props.movies[index]}
            setDetails={props.setDetails}
            config={props.config}
          ></MovieList>
        ))}
    </div>
  );
};

export default HomePage;
