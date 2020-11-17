import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../images/logo.svg';

import '../styles/global.css';
import '../styles/pages/landing.css';

const Landing: React.FC = () => (
  <div id="page-landing">
    <div className="content-wrapper">
      <img src={logoImg} alt="Happy" id="children" />

      <main>
        <h1>Leve felicidade para o mundo</h1>
        <p>
          Visite orfanatos e mude o dia de muitas crianças.
        </p>
      </main>

      <div className="location">
        <strong>Ouro Preto</strong>
        <span>Minas Gerais</span>
      </div>

      <Link to="app" className="enter-app">
        <FiArrowRight name="arrow-right" size={26} color="rgba(0, 0, 0, 0.6)" />
      </Link>

      <Link to="app" className="enter-app-mobile">
        <FiArrowRight size={30} color="rgba(0, 0, 0, 0.6)" className="mb-arrow" />
      </Link>
    </div>
  </div>
);

export default Landing;
