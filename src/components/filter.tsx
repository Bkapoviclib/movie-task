import { useState } from "react";
import Movie from "../types/movie_types";

const Filter = (props: any) => {
  const filterList = props.genres.genres.map((genre: any) => {
    return (
      <span className="checkbox-span">
        <input
          className="form-check-input"
          type="checkbox"
          checked={props.filters[genre.id]}
          id={genre.id}
          onClick={() => {
            props.setFilters((prevState: any) => ({
              ...prevState,
              [genre.id]: !prevState[genre.id],
            }));
          }}
        />
        <label className="form-check-label" htmlFor={genre.id}>
          {genre.name}
        </label>
      </span>
    );
  });

  return (
    <div id="filters-container">
      <span>FILTERS</span>

      <span>GENRES</span>

      <ul id="filter-ul">{filterList}</ul>
    </div>
  );
};

export default Filter;
