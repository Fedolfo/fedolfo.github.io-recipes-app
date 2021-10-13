import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import '../css/pageProgress.css';
import { checkFavorite } from '../components/CheckFavorite';
import FavoriteDrink from '../components/FavoriteDrink';

function DrinksProgress() {
  const { drinkId } = useParams();
  const [drinksById, setDrinksById] = useState([]);
  const { listIngredients,
    drinksApi: { fetchDataByIdDrink },
    feedDoneRecipesInLocalStorageDrinks } = useContext(MyContext);
  const { drinks } = drinksById;
  const ingredients = [];
  const history = useHistory();
  const [listIngredientsCocktails, setListIngredientCocktails] = useState([]);
  const [finishRecipeCocktails, setFinishRecipeCocktails] = useState(false);
  listIngredients(drinks, ingredients);

  const handleScratchedIngredient = ({ target }, i) => {
    const scratched = document.querySelectorAll('.teste')[i];
    const checkbox = document.querySelectorAll('input[type=checkbox]')[i];
    if (checkbox.checked) {
      scratched.classList.add('risk');
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: [...saveProgress.cocktails[drinkId], target.value],
        },
      });
      setListIngredientCocktails([...listIngredientsCocktails, target.value]);
    } else {
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      scratched.classList.remove('risk');
      const removeIngredient = saveProgress.cocktails[drinkId];
      removeIngredient.splice(removeIngredient.indexOf(target.value), 1);
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: removeIngredient,
        },
      });
      setListIngredientCocktails([...removeIngredient]);
    }
  };

  const handleClickShareIcon = () => {
    const domain = `${window.location.protocol}//${window.location.host}`;
    const fullURL = `${domain}${`/bebidas/${drinkId}/in-progress`}`;
    navigator.clipboard.writeText(fullURL);
  };

  const ingredientsInProgress = () => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getCocktails = saveProgress.cocktails;
    const arrayIngredients = getCocktails[drinkId];
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

  useEffect(() => {
    const fetchData = async () => {
      const idDrink = await fetchDataByIdDrink(drinkId);
      setDrinksById(idDrink);
    };
    fetchData();
  }, [fetchDataByIdDrink, drinkId]);

  useEffect(() => {
    const setLocalStorage = () => {
      const LS = {
        cocktails: {
          [drinkId]: [],
        },
      };
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (saveProgress === null) {
        localStorage.inProgressRecipes = JSON.stringify(LS);
      }
    };
    setLocalStorage();
  }, [drinkId]);

  useEffect(() => {
    checkFavorite(drinkId);
  }, [drinkId]);

  setTimeout(() => {
    const switchFinishBtnCocktails = () => {
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const checkboxLength = document.querySelectorAll('input[type=checkbox]').length;
      if (saveProgress.cocktails[drinkId].length === checkboxLength) {
        setFinishRecipeCocktails(false);
      } else {
        setFinishRecipeCocktails(true);
      }
    };
    switchFinishBtnCocktails();
  });

  const handleClick = () => {
    feedDoneRecipesInLocalStorageDrinks(drinks);
    history.push('/receitas-feitas');
  };

  return (
    <div>
      {drinks && drinks.map((item, index) => {
        const {
          strDrink,
          strDrinkThumb,
          strCategory,
          strInstructions,
        } = item;
        return (
          <div key={ index }>
            <div className="container-details">
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid="recipe-photo"
                className="details-image"
              />
              <div className="container-title">
                <div>
                  <h2 className="details-name" data-testid="recipe-title">{strDrink}</h2>
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
                <FavoriteDrink
                  drinks={ drinks }
                  typeCategory="bebida"
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
              <div className="ingredients-instructions-drinks">
                {ingredients.map((ingredient, indexad) => (
                  <div key={ indexad }>
                    <label
                      htmlFor={ ingredient }
                      className="teste input-checkbox"
                      data-testid={ `${indexad}-ingredient-step` }

                    >
                      <input
                        type="checkbox"
                        id={ ingredient }
                        value={ ingredient }
                        onClick={ (event) => handleScratchedIngredient(event, indexad) }
                      />
                      {ingredient}
                    </label>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 data-testid="instructions" className="titles">Instructions</h3>
              <p
                className="ingredients-instructions-drinks"
                data-testid="instructions"
              >
                {strInstructions}
              </p>
            </section>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ finishRecipeCocktails }
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
export default DrinksProgress;
