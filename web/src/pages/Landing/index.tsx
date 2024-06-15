/// <reference path="../../../react-app-env.d.ts" />

import React from 'react';
import { FaArrowRight, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useTheme } from 'context/ThemeContext';
import { useLocation } from 'context/LocationContext';

import logoLight from '../../assets/logo/logo-light.png';
import logoDark from '../../assets/logo/logo-dark.png';

import './styles.css';

const Landing = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { city, state } = useLocation();

  console.log(city, state);

  return (
    <div id='page-landing' className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className='content-wrapper'>
        <img
          src={isDarkMode ? logoDark : logoLight}
          alt='Logo'
          className='logo'
        />

        <main>
          <h1>Leve alegria para sua casa</h1>
          <p>Seu carinho pode mudar o destino de um pet.</p>
        </main>

        <div className='location'>
          <div className='local'>
            <strong>{city},</strong>
            <span>{state}</span>
          </div>

          <button onClick={toggleTheme}>
            {isDarkMode ? (
              <FaMoon size={26} color='rgba(225, 225, 255, 1)' />
            ) : (
              <FaSun size={26} color='rgba(0, 0, 0, 0.6)' />
            )}
          </button>
        </div>

        <Link to='/app' className='enter-app'>
          {isDarkMode ? (
            <FaArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
          ) : (
            <FaArrowRight size={26} color='rgba(225, 225, 255, 1)' />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Landing;
