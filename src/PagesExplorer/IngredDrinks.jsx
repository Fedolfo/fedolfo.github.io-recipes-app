import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import '../css/exploreIngredientsFoodsAndCocktails.css';

function IngredDrinks() {
  const history = useHistory();
  const [drink, setDrink] = useState([]);
  const { setDataTrue, setGetIng } = useContext(MyContext);

  useEffect(() => {
    function getCocktails() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      fetch(url).then((response) => {
        response.json().then((data) => {
          const results = data;
          setDrink(results.drinks);
        });
      });
    }
    getCocktails();
    setDataTrue(false);
  }, [setDataTrue]);

  const handleClick = (strIngredient) => {
    setDataTrue(true);
    setGetIng(strIngredient);
    history.push('/bebidas');
  };

  const numbers = 12;
  return (
    <main className="main-container-ingred">
      <Header title="Explorar Ingredientes" />
      {drink && drink.slice(0, numbers).map((item, index) => {
        const { strIngredient1 } = item;
        return (
          <button
            type="button"
            key={ index }
            onClick={ () => handleClick(strIngredient1) }
            className="link-foods"
          >
            <section key={ index } data-testid={ `${index}-ingredient-card` }>
              <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
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

export default IngredDrinks;
