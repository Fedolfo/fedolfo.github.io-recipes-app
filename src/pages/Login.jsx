import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import '../css/login.css';
import loginimage from '../images/loginimage.png';

const Login = () => {
  const history = useHistory();
  const { loginState, setLoginState } = useContext(MyContext);

  // const recipeStorage = () => {
  //   localStorage.setItem('startButton', true);
  //   localStorage.setItem('startedRecipes', JSON.stringify([]));
  //   // localStorage.setItem('favorites', JSON.stringify([]));
  // };

  // useEffect(() => {
  //   recipeStorage();
  // }, []);

  const handleChange = ({ target: { name, value } }) => {
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const emailRegex = /\S+@\S+\.\S+/;
  const validationPass = 6;
  const dsb = !(emailRegex
    .test(loginState.email) && loginState.password.length > validationPass);

  const handleClick = () => {
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    const userEmail = {
      email: loginState.email,
    };
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.user = JSON.stringify(userEmail);
    localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    history.push('/comidas');
  };

  return (
    <div className="login-body">
      <div className="container-login">
        <div>
          <img
            src={ loginimage }
            className="login-image"
            alt="chefe-de-cozinha"
            style={ { width: '250px' } }
          />
        </div>
        <div>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="text"
              className="login-inputs"
              name="email"
              id="email"
              placeholder="email@email.com"
              onChange={ handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              className="login-inputs"
              type="password"
              placeholder="1234567"
              name="password"
              id="password"
              onChange={ handleChange }
            />
          </label>
        </div>
        <div>
          <button
            data-testid="login-submit-btn"
            className="login_btn"
            type="button"
            disabled={ dsb }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
