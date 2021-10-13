import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/exploreFoodsAndCocktails.css';

function ExploreDrinks() {
  const history = useHistory();

  function handleIngredient() {
    history.push('/explorar/bebidas/ingredientes');
  }

  function handleMeSurpreenda() {
    history.push('/explorar/bebidas/receitaBebidaSurpresa');
  }

  return (
    <main>
      <Header title="Explorar Bebidas" />
      <section className="container-main-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ handleIngredient }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleMeSurpreenda }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default ExploreDrinks;
