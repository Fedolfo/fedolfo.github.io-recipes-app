import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SurpriseDrink() {
  const [drink, setDrink] = useState([]);
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  useEffect(() => {
    function getDrink() {
      fetch(url).then((r) => {
        r.json().then((re) => {
          const results = re;
          setDrink(results.drinks);
        });
      });
    }
    getDrink();
  }, []);

  const renderOne = () => {
    if (drink && drink.length === 1) {
      const { idDrink } = drink[0];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }
  };

  return (
    <section>
      <div>
        <Header title="Receita surpresa" />
        { renderOne() }
        <Footer />
      </div>
    </section>
  );
}

export default SurpriseDrink;
