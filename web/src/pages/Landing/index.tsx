/// <reference path="../../../react-app-env.d.ts" />

import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaSun, FaMoon } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import logoLight from '../../assets/logo/logo-light.png';
import logoDark from '../../assets/logo/logo-dark.png';

import './styles.css';

const Landing = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div id='page-landing'>
      <div className='content-wrapper'>
        <img
          src={isDarkMode ? logoLight : logoDark}
          alt='Logo'
          className='logo'
        />

        <main>
          <h1>Leve alegria para sua casa</h1>
          <p>Seu carinho pode mudar o destino de um pet.</p>
        </main>

        <div className='location'>
          <div className='local'>
            <strong>Salto,</strong>
            <span>São Paulo</span>
          </div>

          <button onClick={toggleTheme}>
            {isDarkMode ? (
              <FaMoon size={26} color='rgba(0, 0, 0, 0.6)' />
            ) : (
              <FaSun size={26} color='rgba(225, 225, 255, 1)' />
            )}
          </button>
        </div>

        <Link to='/app' className='enter-app'>
          <FaArrowRight size={26} color='rgba(225, 225, 255, 1)' />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
