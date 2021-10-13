import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import '../css/exploreIngredientsFoodsAndCocktails.css';

function IngredMeals() {
  const history = useHistory();
  const [ingredients, setIngredient] = useState([]);
  const { setDataTrue, setGetIng } = useContext(MyContext);

  useEffect(() => {
    function getIng() {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      fetch(url).then((response) => {
        response.json().then((data) => {
          const results = data;
          setIngredient(results.meals);
        });
      });
    }
    getIng();
    setDataTrue(false);
  }, [setDataTrue]);

  const handleClick = (strIngredient) => {
    setDataTrue(true);
    setGetIng(strIngredient);
    history.push('/comidas');
  };

  const numbers = 12;
  return (
    <main className="main-container-ingred">
      <Header title="Explorar Ingredientes" />
      {ingredients && ingredients.slice(0, numbers).map((item, index) => {
        const { strIngredient } = item;
        return (
          <button
            type="button"
            key={ index }
            onClick={ () => handleClick(strIngredient) }
            className="link-foods"
          >
            <section key={ index } data-testid={ `${index}-ingredient-card` }>
              <h3 data-testid={ `${index}-card-name` }>{strIngredient}</h3>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
                style={ { width: '250px' } }
                data-testid={ `${index}-card-img` }
              />
            </section>
          </button>
        );
      })}
      <Footer />
    </main>
  );
}

export default IngredMeals;
