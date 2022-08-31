//Imports
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/home";
import MovieDetails from "./components/movieDetails";
import Loader from "./components/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import ShowMore from "./components/showMore";


function App() {
  //State declarations
  let [config, setConfig] = useState({base_url:"",file_sizes:{}});
  let [search, setSearch] = useState();
  let [isSearchOpen,setIsSearchOpen]=useState(false)
  let [movies, setMovies] = useState([]);
  let [favorites,setFavorites]=useState([])
  let [movieDetails,setMovieDetails] = useState([])
  let [searchMovies,setSearchMovies] = useState([])
  let [genres,setGenres]=useState([])
  let genreList:any = {}
  const [filters,setFilters] = useState()
  let [genreMovies,setGenreMovies]:any= useState()
  const key = "1c306ff505f44a4c50353cb8d4d3e1d2";
  let base_url = localStorage.getItem("config_base_url");
  let file_sizes = localStorage.getItem("config_file_size");
  //------------------
  //To be done on page load
  const doEverything = async ()=>{
    //get genres
    const genres = await fetch ("https://api.themoviedb.org/3/genre/movie/list?api_key=1c306ff505f44a4c50353cb8d4d3e1d2")
    const genresJson = await genres.json()
    setGenres(genresJson)
    genresJson.genres.forEach((genre:any)=>genreList[genre.name]=false)
    setFilters(genreList)
    let tempGenreArray: {movies:object,genre:string}[] = []
    //make a call for every genre
    for(let genre of genresJson.genres){
    const moviesByGenre = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=" + key + "&with_genres="+genre.id)
    const moviesByGenreJson = await moviesByGenre.json()
    tempGenreArray.push({genre:genre.name, movies: [...moviesByGenreJson.results]})
    }
    //set state, which will make the home component render
    setGenreMovies(tempGenreArray)
  }
  useEffect(() => {
    doEverything()
    //Try to get favorites from localStorage
    let favorites = localStorage.getItem('favorites')
    if(favorites !== null && favorites !== undefined){
      setFavorites(Array.from(JSON.parse(favorites)))
    }
    async function getConfigFromApi() {
      //If there is no config in local storage, fetch
      if (base_url == null || file_sizes == null) {
        const response = await fetch(
          "https://api.themoviedb.org/3/configuration?api_key=" + key
        );
        const responseJson = await response.json();
        localStorage.setItem(
          "config_base_url",
          responseJson.images.secure_base_url
        );
        const file_sizes = {
          config_file_size_small: responseJson.images.poster_sizes[0],
          config_file_size_medium:responseJson.images.poster_sizes[1],
          config_file_size_large:responseJson.images.poster_sizes[2],
          config_file_size_xxl:responseJson.images.poster_sizes[3]
        }
        localStorage.setItem("file_sizes", JSON.stringify(file_sizes))
        setConfig({
          base_url: responseJson.images.secure_base_url,
          file_sizes: file_sizes,
        });
      }
    if(base_url !==null && file_sizes !==null){
      setConfig({ base_url: base_url, file_sizes: file_sizes });}
    }
    getConfigFromApi();
  }, []);
  return (
    <div className="App">
    {
      config&&genreMovies? 

 //Prop drilling to be solved eventually, needs composition or context
<BrowserRouter>
<Navbar movies={movies} setMovies={setMovies} setSearchMovies={setSearchMovies} setDetails={setMovieDetails} movieDetails={movieDetails} config={config} favorites={favorites} search={search}setSearch={setSearch} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
  <div className={isSearchOpen ? "blur" : ""}>
  <Routes>
    <Route path="*" element={<Navigate replace to="/home"/>} />
    <Route path="/home" element={<HomePage setDetails={setMovieDetails}movies={genreMovies} config={config} />}/>
    <Route path="/showMore/:from" element={<ShowMore filters={filters} setFilters={setFilters} genres={genres}config={config} searchMovies={searchMovies} setSearch={setSearch} favorites={favorites} movies={movies}setFavorites={setFavorites}/>}/>
    <Route path="/movieDetails/:id" element={<MovieDetails favorites={favorites} setFavorites={setFavorites} config={config} movieDetails={movieDetails}/>}/>
  </Routes>
  </div>
</BrowserRouter> :<Loader/>
    }
  </div>
  );
}

export default App;
