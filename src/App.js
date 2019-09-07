import React, { useEffect, useState } from "react";
import Recipe from "./components/Recipe";

import "./App.css";

const App = () => {
  const APP_ID = "ec4d40eb";
  const APP_KEY = "0b3e6447e34d80f3581d7d37ef990c21";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search__form">
        <input
          className="search__form--bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search__form--button" type="submit">
          Search
        </button>
      </form>
      <div className="recipe__wrapper">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
