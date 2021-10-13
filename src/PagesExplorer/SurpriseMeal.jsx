import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SurpriseMeal() {
  const [meal, setMeal] = useState([]);
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  useEffect(() => {
    function getMeal() {
      fetch(url).then((response) => {
        response.json().then((data) => {
          const results = data;
          setMeal(results.meals);
        });
      });
    }
    getMeal();
  }, []);

  const renderOne = () => {
    if (meal && meal.length === 1) {
      const { idMeal } = meal[0];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    }
  };

  return (
    <section>
      <Header title="Receita surpresa" />
      { renderOne() }
      <Footer />
    </section>
  );
}

export default SurpriseMeal;
