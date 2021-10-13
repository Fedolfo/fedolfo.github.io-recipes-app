import PropTypes from 'prop-types';
import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteDrink({ drinks, typeCategory }) {
  const [favoriteBtn, setFavoriteBtn] = useState(false);

  const favoriteStorage = () => drinks.map((item) => {
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = item;
    return ({
      id: idDrink,
      type: typeCategory,
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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

FavoriteDrink.propTypes = {
  drinks: PropTypes.shape({
    map: PropTypes.func,
  }),
  typeCategory: PropTypes.string,
}.isRequired;

export default FavoriteDrink;
