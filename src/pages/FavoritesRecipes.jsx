import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import '../css/favoriterecipes.css';

const FavoritesRecipes = () => {
  // estado do componente que contém o array de receitas favoritas que será renderizado nos cards;
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesClone, setFavoriteRecipesClone] = useState([]);

  // função que atualiza o estado conforme o botão "desfavoritar" é acionado;
  const getFavoriteRecipesFromLocalStorage = () => {
    const json = localStorage.getItem('favoriteRecipes');
    const favoriteRecipesObj = JSON.parse(json);
    setFavoriteRecipes(favoriteRecipesObj);
    setFavoriteRecipesClone(favoriteRecipesObj);
  };

  const removeFavoriteRecipe = (strIdItem) => {
    const arrayStringfyFavRecipes = localStorage.getItem('favoriteRecipes'); // obtem o array de receitas favoritas no localStorage
    const arrayObjFavRecipes = JSON.parse(arrayStringfyFavRecipes); // transforma para objeto
    // console.log('arrayFavRecipes', arrayObjFavRecipes);
    const favoriteArrayUpdated = arrayObjFavRecipes.filter((item) => (
      item.id !== strIdItem
    )); // filtra pela exceção
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteArrayUpdated)); // atualiza o localStorage
    setFavoriteRecipes(favoriteArrayUpdated); // atualiza o estado que está no componente pai para chamar a renderização com o array atualizado
    setFavoriteRecipesClone(favoriteArrayUpdated); // atualiza o estado que está no componente pai para chamar a renderização com o array atualizado
  };

  useEffect(() => (
    getFavoriteRecipesFromLocalStorage()
  ), []);

  const showAllFavoriteRecipes = () => {
    // Atualiza o estado com a mesma rotina do didMout
    getFavoriteRecipesFromLocalStorage();
  };

  const filterOnlyFoods = () => {
    const onlyFoods = favoriteRecipesClone.filter((item) => item.type === 'comida');
    setFavoriteRecipes(onlyFoods);
  };

  const filterOnlyDrinks = () => {
    const onlyDrinks = favoriteRecipesClone.filter((item) => item.type === 'bebida');
    setFavoriteRecipes(onlyDrinks);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="container-buttons-favorite">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => showAllFavoriteRecipes() }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filterOnlyFoods() }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterOnlyDrinks() }
        >
          Drinks
        </button>
      </div>
      { favoriteRecipes && favoriteRecipes.map((item, index) => (
        <CardFavorite
          Key={ index }
          indexProps={ index }
          strID={ item.id }
          strType={ item.type }
          sourceImage={ item.image }
          strRecipeName={ item.name }
          strCategory={ item.category }
          strArea={ item.area }
          strAlcoholicOrNot={ item.alcoholicOrNot }
          fnRemoveFavoriteRecipe={ removeFavoriteRecipe }
        />
      ))}
    </div>
  );
};

export default FavoritesRecipes;
