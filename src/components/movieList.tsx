import { useNavigate } from "react-router-dom";

const MovieList = (props: any) => {
  const navigate = useNavigate();
  let handleMovieClick = (movieId: number) =>
    navigate("/movieDetails/" + movieId);
  //Scrolling for vertical scroll container
  const scroll = (direction: any, genre: any) => {
    let container = document.getElementById(genre);
    if (container) {
      if (direction === "left") {
        container.scrollLeft -= 300;
      } else {
        container.scrollLeft += 300;
      }
    }
  };
  return (
    <>
      <label>{props.movies.genre}</label>
      <div id={props.movies.genre} className="row">
        <span
          id="scroll-left"
          onClick={() => scroll("left", props.movies.genre)}
        >
          <i className="bi bi-arrow-left-circle"></i>
        </span>
        {props.movies.movies.map((movie: any) => (
          <>
            <span
              className="col"
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={
                  props.config.base_url +
                  props.config.file_sizes.config_file_size_medium +
                  movie.poster_path
                }
                alt={movie.title}
              ></img>
            </span>
          </>
        ))}
        <span
          id="scroll-right"
          onClick={() => scroll("right", props.movies.genre)}
        >
          <i className="bi bi-arrow-right-circle" />
        </span>
      </div>
    </>
  );
};

export default MovieList;
