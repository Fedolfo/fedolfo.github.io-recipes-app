import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';
import '../css/drinks.css';

function Drinks() {
  const { dataDrinks,
    drinksApi: { queryIngredientDrink },
    arrayFiltered,
    getIng,
    dataTrue,
    fetchDataDrinks,
    setDataDrinks } = useContext(MyContext);

  const { drinks } = dataDrinks;
  const history = useHistory();

  const setLocalStorageForDoneRecipes = () => {
    const doneRecipesInLocalStore = localStorage.doneRecipes;
    if (!doneRecipesInLocalStore) {
      localStorage.doneRecipes = JSON.stringify([]);
    }
  };

  useEffect(() => {
    setLocalStorageForDoneRecipes();
  }, []);

  useEffect(() => {
    const setIngredient = async () => {
      if (dataTrue === true) {
        const dataIngredients = await queryIngredientDrink(getIng);
        setDataDrinks(dataIngredients);
      } else {
        const fetchData = async () => fetchDataDrinks();
        fetchData();
      }
    };
    setIngredient();
  }, []);

  const renderOne = () => {
    if (drinks && drinks.length === 1) {
      const { idDrink } = drinks[0];
      return history.push(`/bebidas/${idDrink}`);
    }
  };

  const renderAll = () => {
    if (drinks) {
      return arrayFiltered(drinks).map((item, index) => {
        const { strDrink, strDrinkThumb, idDrink } = item;
        return (
          <Link
            to={ `/bebidas/${idDrink}` }
            className="link-drinks"
            key={ index }
          >
            <div
              key={ index }
              className="container-drinks"
              data-testid={ `${index}-recipe-card` }
            >
              <h3
                className="name-drinks"
                data-testid={ `${index}-card-name` }
              >
                {strDrink}

              </h3>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                className="image-drinks"
                style={ { width: '180px' } }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        );
      });
    }
  };

  return (
    <div className="main-container">
      <Header title="Bebidas" searchIcone hiddenCategory />
      {renderOne()}
      {renderAll()}
      <Footer />
    </div>
  );
}

export default Drinks;
