import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipesdone.css';

const CardRecipeDone = (
  {
    Key,
    strID,
    strType,
    indexProps,
    sourceImage,
    strRecipeName,
    strCategory,
    strArea,
    dtFinishDate,
    arrTags,
    strAlcoholicOrNot,
  },
) => {
  const [boolLinkCopied, setBoolLinkCopied] = useState(false);

  const detailsPath = (type, id) => (type === 'comida' ? `/comidas/${id}`
    : `/bebidas/${id}`);

  // Source: https://newbedev.com/copy-url-to-clipboard-react-code-example
  const handleClickShareIcon = () => {
    const domain = `${window.location.protocol}//${window.location.host}`;
    const fullURL = `${domain}${detailsPath(strType, strID)}`;
    navigator.clipboard.writeText(fullURL);
    setBoolLinkCopied(true);
  };

  return (
    <div className="container-done" Key={ Key }>
      <Link to={ detailsPath(strType, strID) }>
        <div>
          <img
            alt={ sourceImage }
            data-testid={ `${indexProps}-horizontal-image` }
            src={ sourceImage }
            style={ { width: '150px', borderRadius: '5px' } }
          />
        </div>
      </Link>
      <div>
        <Link to={ detailsPath(strType, strID) }>
          <div>
            <p
              className="titles-done"
              data-testid={ `${indexProps}-horizontal-name` }
            >
              { strRecipeName }
            </p>
            <p
              className="details-optional-done"
              data-testid={ `${indexProps}-horizontal-top-text` }
            >
              { strType === 'comida' ? `${strArea} - ${strCategory}` : strAlcoholicOrNot }
            </p>
          </div>
        </Link>
        <div className="footer-done">
          <button type="button" onClick={ handleClickShareIcon } className="icons">
            <img
              alt="search-icon"
              data-testid={ `${indexProps}-horizontal-share-btn` }
              src={ shareIcon }
            />
          </button>
          <div className="container-done-footer">
            <span className="link">{ boolLinkCopied ? 'Link copiado!' : null}</span>
            <p
              data-testid={ `${indexProps}-horizontal-done-date` }
            >
              { dtFinishDate }
            </p>
          </div>
        </div>
      </div>
      <div>
        { arrTags && arrTags.map((tagName, index) => (
          <div
            data-testid={ `${indexProps}-${tagName}-horizontal-tag` }
            key={ index }
          >
            { tagName }
          </div>
        )) }
      </div>
    </div>
  );
};

CardRecipeDone.propTypes = {
  Key: PropTypes.string,
  arrTags: PropTypes.shape({
    split: PropTypes.func,
  }),
  dtFinishDate: PropTypes.string,
  indexProps: PropTypes.string,
  sourceImage: PropTypes.string,
  strAlcoholicOrNot: PropTypes.string,
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
  strID: PropTypes.string,
  strRecipeName: PropTypes.string,
  strType: PropTypes.string,
}.isRequired;

export default CardRecipeDone;
