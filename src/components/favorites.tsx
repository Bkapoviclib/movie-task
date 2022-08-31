import { useNavigate } from "react-router-dom";
import Movie from "../types/movie_types";

const Favorites = (props: any) => {
  const navigate = useNavigate();
  let handleMovieClick = (movieId: number) =>
    navigate("/movieDetails/" + movieId);
  let linkClickHandler = () => navigate("/showMore/favorites");
  let movieList = props.favorites.map((movie: Movie) => (
    <span
      onClick={() => handleMovieClick(movie.id)}
      className="dropdown-item movie-span"
    >
      <img
        src={
          props.config.base_url +
          props.config.file_sizes.config_file_size_small +
          movie.poster_path
        }
        alt={movie.title}
      ></img>
    </span>
  ));
  return (
    <div className="dropdown">
      <span
        className=" dropdown-toggle"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        FAVORITES
      </span>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <span className="show-more" onClick={linkClickHandler}>
          Show more...
        </span>

        <ul id="favorites-list">{movieList}</ul>
      </div>
    </div>
  );
};

export default Favorites;
