import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Perfil from './pages/Perfil';
import Explore from './PagesExplorer/Explore';
import ExploreMeals from './PagesExplorer/ExploreMeals';
import ExploreDrinks from './PagesExplorer/ExploreDrinks';
import FoodsDetails from './pagesDetails/FoodsDetails';
import DrinksDetails from './pagesDetails/DrinksDetails';
import FoodsProgress from './pagesProgress/FoodsProgress';
import DrinksProgress from './pagesProgress/DrinksProgress';
import RecipesDone from './pages/RecipesDone';
import FavoriteRecipes from './pages/FavoritesRecipes';
import IngredDrinks from './PagesExplorer/IngredDrinks';
import IngredMeals from './PagesExplorer/IngredMeals';
import MealsArea from './PagesExplorer/MealsArea';
import SurpriseDrink from './PagesExplorer/SurpriseDrink';
import SurpriseMeal from './PagesExplorer/SurpriseMeal';
import NotFound from './pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/comidas/:mealId" component={ FoodsDetails } />
      <Route
        exact
        path="/comidas/:mealId/in-progress"
        component={ FoodsProgress }
      />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/bebidas/:drinkId" component={ DrinksDetails } />
      <Route
        exact
        path="/bebidas/:drinkId/in-progress"
        component={ DrinksProgress }
      />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ IngredMeals }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ IngredDrinks }
      />
      <Route exact path="/explorar/comidas/area" component={ MealsArea } />
      <Route
        exact
        path="/explorar/bebidas/receitaBebidaSurpresa"
        component={ SurpriseDrink }
      />
      <Route
        exact
        path="/explorar/comidas/receitaComidaSurpresa"
        component={ SurpriseMeal }
      />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="" component={ NotFound } />

    </Switch>
  );
}

export default Routes;

// Tela de detalhes de uma receita de comida: /comidas/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /bebidas/{id-da-receita};
// Tela de receita em processo de comida: /comidas/{id-da-receita}/in-progress;
// Tela de receita em processo de bebida: /bebidas/{id-da-receita}/in-progress;
// Tela de explorar: /explorar;
// Tela de explorar comidas: /explorar/comidas;
// Tela de explorar bebidas: /explorar/bebidas;
// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes;
// Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes;
// Tela de explorar comidas por local de origem: /explorar/comidas/area;
// Tela de perfil: /perfil;
// Tela de receitas feitas: /receitas-feitas;
// Tela de receitas favoritas: /receitas-favoritas.
