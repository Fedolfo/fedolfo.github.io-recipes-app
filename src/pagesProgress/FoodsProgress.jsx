import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import '../css/pageProgress.css';
import { checkFavorite } from '../components/CheckFavorite';
import FavoriteFood from '../components/FavoriteFoods';

function FoodsProgress() {
  const { mealId } = useParams();
  const [mealsDataById, setMealsDataById] = useState([]);
  const { listIngredients,
    recipesApi: { fetchDataByIdMeal },
    feedDoneRecipesInLocalStorageFoods } = useContext(MyContext);
  const { meals } = mealsDataById;
  const ingredients = [];
  const history = useHistory();
  const [listIngredientFoods, setListIngredientFoods] = useState([]);
  const [finishRecipeFoods, setFinishRecipeFoods] = useState(false);
  listIngredients(meals, ingredients);

  const handleScratchedIngredient = ({ target }, i) => {
    const scratched = document.querySelectorAll('.teste')[i];
    const checkbox = document.querySelectorAll('input[type=checkbox]')[i];
    if (checkbox.checked) {
      scratched.classList.add('risk');
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        meals: {
          ...saveProgress.meals,
          [mealId]: [...saveProgress.meals[mealId], target.value],
        },
      });
      setListIngredientFoods([...listIngredientFoods, target.value]);
    } else {
      scratched.classList.remove('risk');
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const removeIngredient = saveProgress.meals[mealId];
      removeIngredient.splice(removeIngredient.indexOf(target.value), 1);
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        meals: {
          ...saveProgress.meals,
          [mealId]: removeIngredient,
        },
      });
      setListIngredientFoods([...removeIngredient]);
    }
  };

  const ingredientsInProgress = () => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getCocktails = saveProgress.meals;
    const arrayIngredients = getCocktails[mealId];

    if (arrayIngredients) {
      arrayIngredients.map((idIngredient) => {
        const checkboxChecked = document.getElementById(idIngredient);
        if (checkboxChecked) {
          checkboxChecked.parentElement.classList.add('risk');
          checkboxChecked.checked = true;
          checkboxChecked.setAttribute('checked', 'true');
        } return null;
      });
    }
  };

  setTimeout(() => {
    ingredientsInProgress();
  });

  // Source: https://newbedev.com/copy-url-to-clipboard-react-code-example
  const handleClickShareIcon = () => {
    const domain = `${window.location.protocol}//${window.location.host}`;
    const fullURL = `${domain}${`/comidas/${mealId}/in-progress`}`;
    navigator.clipboard.writeText(fullURL);
  };

  useEffect(() => {
    const fetchData = async () => {
      const idFood = await fetchDataByIdMeal(mealId);
      setMealsDataById(idFood);
    };
    fetchData();
  }, [fetchDataByIdMeal, mealId]);

  useEffect(() => {
    const setLocalStorage = () => {
      const LS = {
        meals: {
          [mealId]: [],
        },
      };

      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (saveProgress === null) {
        localStorage.inProgressRecipes = JSON.stringify(LS);
      }
    };
    setLocalStorage();
  }, [mealId]);

  setTimeout(() => {
    const switchFinishBtnFoods = () => {
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const checkboxLength = document.querySelectorAll('input[type=checkbox]').length;
      if (saveProgress.meals[mealId].length === checkboxLength) {
        setFinishRecipeFoods(false);
      } else {
        setFinishRecipeFoods(true);
      }
    };
    switchFinishBtnFoods();
  });

  useEffect(() => {
    checkFavorite(mealId);
  });

  const handleClick = () => {
    feedDoneRecipesInLocalStorageFoods(meals);
    history.push('/receitas-feitas');
  };
  return (
    <div>
      {meals && meals.map((item, index) => {
        const {
          strMeal,
          strMealThumb,
          strCategory,
          strInstructions,
        } = item;
        return (
          <div key={ index }>
            <div className="container-details">
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid="recipe-photo"
                className="details-image-foods"
              />
              <div className="container-title-foods">
                <div>
                  <h2
                    className="details-name-foods"
                    data-testid="recipe-title"
                  >
                    {strMeal}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={ handleClickShareIcon }
                  className="icons"
                >
                  <img
                    src={ shareIcon }
                    alt={ shareIcon }
                    data-testid="share-btn"
                  />
                </button>
                <FavoriteFood
                  meals={ meals }
                  typeCategory="comida"
                />
              </div>
              <h3
                className="details-optional"
                data-testid="recipe-category"
              >
                {strCategory}
              </h3>
            </div>
            <section>
              <h3 className="titles">Ingredients</h3>
              <div className="ingredients-instructions-foods">
                {ingredients.map((ingredient, i) => (
                  <div key={ i }>
                    <label
                      htmlFor={ ingredient }
                      className="teste"
                      data-testid={ `${i}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ ingredient }
                        value={ ingredient }
                        onClick={ (event) => handleScratchedIngredient(event, i) }
                      />
                      {ingredient}
                    </label>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="titles" data-testid="instructions">Instructions</h3>
              <p
                className="ingredients-instructions-foods"
                data-testid="instructions"
              >
                {strInstructions}
              </p>
            </section>

            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ finishRecipeFoods }
              onClick={ () => handleClick() }
              className="btn-finish"
            >
              Finalizar Receita
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FoodsProgress;
