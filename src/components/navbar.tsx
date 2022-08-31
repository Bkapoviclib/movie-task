import { useEffect, useState } from "react";
import Favorites from "./favorites";
import Movie from "../types/movie_types";
import { useNavigate } from "react-router-dom";

const Navbar = (props: any) => {
  const key = "1c306ff505f44a4c50353cb8d4d3e1d2";
  const search_base_url =
    "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=";
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => props.setSearch(e.target.value);
  const handleBlur = (e: any) => {
    //Needs small timeout to work
    setTimeout(() => setDropdown(false), 100);
    props.setIsSearchOpen(false);
  };
  const handleFocus = (e: any) => {
    setDropdown(true);
    props.setIsSearchOpen(true);
  };
  let handleHomeClick = () => navigate("/home");
  let openMovieDetails = (movieId: number) =>
    navigate("/movieDetails/" + movieId);
  const linkClickHandler = (e: any) => {
    props.setSearchMovies(props.movies);
    setTimeout(() => {
      navigate("/showMore/search");
    }, 800);
  };
  useEffect(() => {
    //Debounce on search
    const search = setTimeout(async () => {
      if (props.search !== undefined) {
        const response = await fetch(search_base_url + props.search);
        const responseJson = await response.json();
        props.setMovies(responseJson.results);
      }
    }, 800);
  }, [props.search]);
  return (
    <div className="navbar d-flex justify-content-between">
      <div className="navbar-navigation">
        <span id="home-button" onClick={handleHomeClick}>
          HOME
        </span>
        {!!props.config && !!props.favorites && (
          <Favorites
            setDetails={props.setDetails}
            config={props.config}
            favorites={props.favorites}
          />
        )}
      </div>
      <span id="search">
        <span id="search-bar">
          <input
            className={props.isSearchOpen && props.search ? "inputFocused" : ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            value={props.search || ""}
            onChange={handleChange}
          ></input>
          <i className="bi bi-search"></i>
        </span>
        <div
          className={
            "dropdown " + (dropdown === true && props.search ? "show" : "")
          }
        >
          <div className="dropdown-menu" id="searchDropdown">
            {props.search && (
              <span className="show-more" onClick={linkClickHandler}>
                Show more...
              </span>
            )}
            <ul id="movie-list">
              {!!props.movies &&
                props.movies !== undefined &&
                props.movies.map((movie: Movie) => (
                  <span
                    onClick={() => openMovieDetails(movie.id)}
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
                ))}
            </ul>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Navbar;
