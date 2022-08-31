import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../types/movie_types";
const MovieDetails = (props: any) => {
  let { id } = useParams();
  let [details, setDetails] = useState({} as any);
  const key = "1c306ff505f44a4c50353cb8d4d3e1d2";
  useEffect(() => {
    getMovieDetails(id);
  }, [id]);
  const getMovieDetails = async (id: string | undefined) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key
    );
    const responseJson = await response.json();
    setDetails(responseJson);
  };
  const isFavorited = (): number => {
    //Returns index of the current movie in the favorites array if it exists,
    //else returns -1
    let index = -1;
    for (let i = 0; i < props.favorites.length; i++) {
      if (props.favorites[i].id === details.id) {
        index = i;
        break;
      }
    }
    return index;
  };
  const handleFavoriteClick = (): void => {
    //If found in favorites, remove it
    const index = isFavorited();
    //To avoid mutating the original state array,
    //First do a shallow copy with the spread operator, then mutate the copied array
    if (index > -1) {
      props.setFavorites((prevState: any) => {
        let mutant = [...prevState];
        mutant.splice(index, 1);

        localStorage.setItem("favorites", JSON.stringify([...mutant]));
        return [...mutant];
      });
    } else {
      //If not found in favorites, push
      props.setFavorites((prevState: Movie[] | []) => {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...prevState, details])
        );
        return [...prevState, details];
      });
    }
  };

  return (
    <div className="movie-details-container">
      {details.release_date && (
        <>
          <div className="col1">
            <div className="col1_wrapper">
              <img
                src={
                  props.config.base_url +
                  props.config.file_sizes.config_file_size_xxl +
                  details.poster_path
                }
                alt="hm"
              ></img>
              <div className="button-holder">
                <button
                  className="favorite-button"
                  onClick={() => handleFavoriteClick()}
                >
                  FAVORITE{" "}
                  <i
                    className={
                      isFavorited() > -1
                        ? "bi bi-star-fill favorited"
                        : "bi bi-star"
                    }
                  ></i>
                </button>
                <span
                  className="imdbRatingPlugin"
                  data-user="ur155990844"
                  data-title="tt0076759"
                  data-style="p4"
                >
                  <a
                    href={
                      "https://www.imdb.com/title/" +
                      details.imdb_id +
                      "/?ref_=plg_rt_1"
                    }
                  >
                    <img
                      src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_31x14.png"
                      alt="Star Wars (1977) on IMDb"
                    />
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="col2">
            <span>
              <h1>{details.title} </h1>
              <span>{"(" + details.release_date.slice(0, 4) + ")"}</span>
            </span>
            <div>{details.overview}</div>
          </div>
        </>
      )}
    </div>
  );
};
export default MovieDetails;
