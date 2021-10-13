import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardRecipeDone from '../components/CardRecipeDone';
import '../css/recipesdone.css';

const RecipesDone = () => {
  // Estado do componente que contém o array de receitas feitas (array para renderização via map)
  const [recipesDone, setRecipesDone] = useState([]);
  const [recipesDoneClone, setRecipesDoneClone] = useState([]);

  const getRecipesDoneFromLocalStorage = () => {
    const json = localStorage.getItem('doneRecipes');
    const recipesDoneObj = JSON.parse(json);
    setRecipesDone(recipesDoneObj);
    setRecipesDoneClone(recipesDoneObj);
  };

  useEffect(() => {
    getRecipesDoneFromLocalStorage();
  }, []);

  const showAllRecipesDone = () => {
    // Atualiza o estado com a mesma rotina do didMount
    getRecipesDoneFromLocalStorage();
  };

  const filterOnlyFoods = () => {
    const onlyFoods = recipesDoneClone.filter((item) => item.type === 'comida');
    setRecipesDone(onlyFoods);
  };

  const filterOnlyDrinks = () => {
    const onlyDrinks = recipesDoneClone.filter((item) => item.type === 'bebida');
    setRecipesDone(onlyDrinks);
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="container-buttons-done">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => showAllRecipesDone() }
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
      { recipesDone && recipesDone.map((item, index) => (
        <CardRecipeDone
          Key={ index }
          indexProps={ index }
          strID={ item.id }
          strType={ item.type }
          sourceImage={ item.image }
          strRecipeName={ item.name }
          strCategory={ item.category }
          strArea={ item.area }
          dtFinishDate={ item.doneDate } // "finishDate" é uma sugestão
          strAlcoholicOrNot={ item.alcoholicOrNot }
          arrTags={ item.tags }
        />
      ))}
    </div>
  );
};

export default RecipesDone;
