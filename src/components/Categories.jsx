import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/myContext';
import '../css/categories.css';

function Categories() {
  const {
    recipesApi: {
      categoriesMeals,
      fetchDataMealsByCategory,
    },
    drinksApi: {
      categoriesDrinks,
      fetchDataDrinksByCategory,
    },
    fetchDataMeals,
    fetchDataDrinks,
  } = useContext(MyContext);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const location = useLocation();

  const MAX_BUTTONS = 5;

  useEffect(() => {
    const fetchCategoriesDrinks = async () => {
      const dataCategoriesDrinks = await categoriesDrinks();
      setCategories(dataCategoriesDrinks.drinks);
    };
    const fetchCategoriesMeals = async () => {
      const dataCategoriesMeals = await categoriesMeals();
      setCategories(dataCategoriesMeals.meals);
    };
    const fetchData = async () => ((location.pathname === '/comidas')
      ? fetchCategoriesMeals() : fetchCategoriesDrinks());
    fetchData();
  }, [categoriesDrinks, categoriesMeals, location]);

  const toggleButtons = async (strCategory) => {
    if (location.pathname === '/comidas') {
      fetchDataMealsByCategory(strCategory);
    } else {
      fetchDataDrinksByCategory(strCategory);
    }
  };

  const defaultRecipes = async (strCategory) => {
    if (strCategory === category && location.pathname === '/comidas') {
      setCategory('');
      return fetchDataMeals();
    }
    if (strCategory === category && location.pathname === '/bebidas') {
      setCategory('');
      return fetchDataDrinks();
    }
  };

  const handleClickDefault = () => ((location.pathname === '/comidas')
    ? fetchDataMeals() : fetchDataDrinks());

  const handleClick = (strCategory) => {
    setCategory(strCategory);
    toggleButtons(strCategory);
    defaultRecipes(strCategory);
  };

  return (
    <main className="container-buttons-category">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClickDefault() }
      >
        All
      </button>
      {categories && categories.slice(0, MAX_BUTTONS).map(({ strCategory }, index) => (
        <div key={ index }>

          <button
            id={ index }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ () => handleClick(strCategory) }
          >
            {strCategory}
          </button>
        </div>
      ))}
    </main>
  );
}

export default Categories;
