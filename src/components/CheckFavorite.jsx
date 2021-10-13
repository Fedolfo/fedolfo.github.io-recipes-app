export const checkFavorite = (recipeId) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes !== null) {
    if (favoriteRecipes.filter((e) => e.id === recipeId).length > 0) {
      localStorage.setItem('isFavorite', true);
    } else {
      localStorage.setItem('isFavorite', false);
    }
  }
};

export default checkFavorite;
