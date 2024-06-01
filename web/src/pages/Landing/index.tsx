import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import './styles.css';

const Landing: React.FC = () => {
  return (
    <>
      <div id='page-landing'>
        <div className='content-wrapper'>
          <header>
            <img src='' alt='' />

            <div className='location'>
              <strong>Salto</strong>
              <span>São Paulo</span>
            </div>
          </header>

          <div className='content'>
            <main>
              <h1>Leve alegria para sua casa</h1>
              <p>Seu carinho pode mudar o destino de um pet. </p>
              <Link to='/app' className='enter-app'>
                <FaArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
              </Link>
            </main>

            <div className='ilustra'>
              <img src='../../assets/landing/landing-ilustra.jpg' alt='' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
