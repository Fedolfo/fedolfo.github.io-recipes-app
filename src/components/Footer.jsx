// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer-fixed" data-testid="footer">
      <Link to="/bebidas">
        <img
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
        />
      </Link>
      <Link to="/explorar">
        <img
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        />
      </Link>
      <Link to="/comidas">
        <img
          alt="mealIcon"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        />
      </Link>
    </footer>
  );
}

// Footer.propTypes = {

// }.isRequired;

export default Footer;
