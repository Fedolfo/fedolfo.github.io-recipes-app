import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import {
  queryDefaultMeals,
  queryIngredient,
  queryName,
  queryFirstLetter,
  queryDefaultDrinks,
  queryFirstLetterDrink,
  queryIngredientDrink,
  queryNameDrink,
  categoriesMeals,
  categoriesDrinks,
  fetchCategoryMeal,
  fetchCategoryDrink,
  queryRecipeByID,
  queryDrinkByID,
} from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startButton, setStartButton] = useState(true);
  const [startedRecipes, setStartRecipe] = useState([]);
  const [dataTrue, setDataTrue] = useState(false);
  const [getIng, setGetIng] = useState('');
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const maxNumberIt = 12;

  const arrayFiltered = (arr) => {
    if (arr && arr.length > maxNumberIt) {
      return arr.filter((_, index) => (
        index < maxNumberIt
      ));
    }
    return arr;
  };

  // ========================================================================================================
  // Função para juntar os Ingredientes com as Medidas - referencia grupo 24;
  const listIngredients = (DataDetails, ingredients) => {
    const number = 20;
    if (DataDetails && DataDetails.length !== 0) {
      for (let i = 1; i <= number; i += 1) {
        if (DataDetails[0][`strIngredient${i}`]) {
          const ing = `${DataDetails[0][`strIngredient${i}`]}`;
          const mes = `${DataDetails[0][`strMeasure${i}`]}`;
          ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
        }
      }
    }
  };

  // ========================================================================================================
  // Fetch para atuar na montagem das paginas "Food" e "Drinks"

  const fetchDataMeals = async () => {
    const dataToOpen = await arrayFiltered(queryDefaultMeals());
    setData(dataToOpen);
  };

  const fetchDataDrinks = async () => {
    const dataToOpen = await arrayFiltered(queryDefaultDrinks());
    setDataDrinks(dataToOpen);
  };

  // ========================================================================================================
  // Fetch para atuar nos toggles buttons disponíveis no Header através do Componente "Categories"

  const fetchDataMealsByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryMeal(strCategory));
    setData(dataToOpen);
  };

  const fetchDataDrinksByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryDrink(strCategory));
    setDataDrinks(dataToOpen);
  };
  // =========================================================================================================
  // Fetch realizado pelo ID

  const fetchDataByIdMeal = async (mealID) => {
    const dados = await queryRecipeByID(mealID);
    return dados;
  };

  const fetchDataByIdDrink = async (drinkID) => {
    const dados = await queryDrinkByID(drinkID);
    return dados;
  };
  // ========================================================================================================
  const buildArrTags = (strTags) => {
    const typeValue = typeof (strTags);
    if (typeValue === 'string') {
      const tagsToArray = strTags.trim().split(',');
      console.log(tagsToArray);
      return tagsToArray;
    }
    return [];
  };

  const getCurrentDate = (separator) => {
    // Source: https://stackoverflow.com/questions/43744312/react-js-get-current-date
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const numberTen = 10;
    return `${year}${separator}${month < numberTen ? `0${month}`
      : `${month}`}${separator}${day}`;
  };

  const mountTemplateForSaveInLocalStorageDoneRecipesDrinks = (obj) => {
    const strFinishDate = getCurrentDate('/');
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = obj[0];
    return ([{
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: strFinishDate,
      tags: [],
    }]);
  };

  const feedDoneRecipesInLocalStorageDrinks = (obj) => {
    const actualFinishRecipe = mountTemplateForSaveInLocalStorageDoneRecipesDrinks(obj);
    const doneRecipesInLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesInLocalStorage) {
      const doneRecipesToUpdate = [...doneRecipesInLocalStorage, ...actualFinishRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesToUpdate));
    } else {
      localStorage.doneRecipes = JSON.stringify([]);
    }
  };

  const mountTemplateForSaveInLocalStorageDoneRecipesFoods = (obj) => {
    const strFinishDate = getCurrentDate('/');
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = obj[0];
    const arrayOfTags = buildArrTags(strTags);
    return ([{
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: strFinishDate,
      tags: arrayOfTags,
    }]);
  };

  const feedDoneRecipesInLocalStorageFoods = (obj) => {
    const actualFinishRecipe = mountTemplateForSaveInLocalStorageDoneRecipesFoods(obj);
    const doneRecipesInLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesInLocalStorage) {
      const doneRecipesToUpdate = [...doneRecipesInLocalStorage, ...actualFinishRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesToUpdate));
    } else {
      localStorage.doneRecipes = JSON.stringify([]);
    }
  };

  // ========================================================================================================
  const contextValue = {
    ...data,
    dataDrinks,
    setData,
    setDataDrinks,
    loading,
    setLoading,
    startButton,
    setStartButton,
    startedRecipes,
    setStartRecipe,
    fetchDataDrinks,
    fetchDataMeals,
    setLoginState,
    loginState,
    setDataTrue,
    dataTrue,
    setGetIng,
    getIng,
    recipesApi: {
      queryDefaultMeals,
      queryFirstLetter,
      queryIngredient,
      queryName,
      categoriesMeals,
      fetchDataMealsByCategory,
      fetchDataByIdMeal,
    },
    drinksApi: {
      queryDefaultDrinks,
      queryFirstLetterDrink,
      queryIngredientDrink,
      queryNameDrink,
      categoriesDrinks,
      fetchDataDrinksByCategory,
      fetchDataByIdDrink,
    },
    arrayFiltered,
    listIngredients,
    feedDoneRecipesInLocalStorageDrinks,
    feedDoneRecipesInLocalStorageFoods,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
