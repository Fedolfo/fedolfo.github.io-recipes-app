import PropTypes from 'prop-types';
import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteFood({ meals, typeCategory }) {
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  const favoriteStorage = () => meals.map((item) => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = item;
    return ({
      id: idMeal,
      type: typeCategory,
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    });
  });

  const favoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = JSON.parse(localStorage.getItem('isFavorite'));
    if (!isFavorite) {
      localStorage.setItem('isFavorite', true);
      setFavoriteBtn(true);
      if (favoriteRecipes === null) {
        localStorage.favoriteRecipes = JSON.stringify(favoriteStorage());
      } else {
        const recipesArr = [...favoriteRecipes, ...favoriteStorage()];
        localStorage.setItem('favoriteRecipes', JSON.stringify(recipesArr));
      }
    } else {
      localStorage.setItem('isFavorite', false);
      const index = favoriteRecipes.indexOf(favoriteStorage());
      favoriteRecipes.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavoriteBtn(false);
    }
  };

  const renderFavorite = (recipeFavorite) => {
    const isFavorite = JSON.parse(localStorage.getItem('isFavorite'));
    return (
      <button
        type="button"
        onClick={ recipeFavorite }
        className="icons"
      >
        <img
          data-testid="favorite-btn"
          src={ (!favoriteBtn && !isFavorite) ? whiteHeartIcon : blackHeartIcon }
          alt="Favoritar"
        />
      </button>
    );
  };

  return (
    <div>
      {renderFavorite(favoriteClick)}
    </div>
  );
}

FavoriteFood.propTypes = {
  meals: PropTypes.shape({
    map: PropTypes.string,
  }),
  typeCategory: PropTypes.string,
}.isRequired;

export default FavoriteFood;
