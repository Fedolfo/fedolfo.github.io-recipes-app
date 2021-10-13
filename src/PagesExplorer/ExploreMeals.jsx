import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/exploreFoodsAndCocktails.css';

function ExploreMeals() {
  const history = useHistory();

  function handleIngredient() {
    history.push('/explorar/comidas/ingredientes');
  }
  function handleArea() {
    history.push('/explorar/comidas/area');
  }
  function handleMeSurpreenda() {
    history.push('/explorar/comidas/receitaComidaSurpresa');
  }

  return (
    <main>
      <Header title="Explorar Comidas" />
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
          data-testid="explore-by-area"
          onClick={ handleArea }
        >
          Por Local de Origem
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

export default ExploreMeals;
