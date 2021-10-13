import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Perfil.css';

function Perfil() {
  const history = useHistory();

  const handleRecipesFinished = () => {
    history.push('/receitas-feitas');
  };
  const handleRecipeFavorites = () => {
    history.push('/receitas-favoritas');
  };
  const renderEmailLocalStorage = () => {
    const email = JSON.parse(localStorage.getItem('user'));
    if (email) { return email.email; }
  };
  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <Header title="Perfil" />
      <section className="container-main-perfil">
        <div className="container-buttons">
          <span data-testid="profile-email">{renderEmailLocalStorage()}</span>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ handleRecipesFinished }
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ handleRecipeFavorites }
          >
            Receitas Favoritas
          </button>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
          >
            Sair
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Perfil;
