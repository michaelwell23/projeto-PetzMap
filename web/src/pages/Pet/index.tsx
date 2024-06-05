import React from 'react';

import { Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';

import PrimaryButton from 'components/PrimaryButton';
import Sidebar from 'components/Sidebar';
import Map from 'components/Map';

import { useTheme } from 'context/ThemeContext';

import getLocationIcon from 'components/Map/petzMapIcon';

import './styles.css';

const Pet: React.FC = () => {
  const { isDarkMode } = useTheme();

  const locationIcon = getLocationIcon(isDarkMode);

  return (
    <>
      <div id='page-pet'>
        <Sidebar />

        <main>
          <div className='pet-details'>
            <img
              src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
              alt='Lar das meninas'
            />

            <div className='images'>
              <button className='active' type='button'>
                <img
                  src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                  alt='Lar das meninas'
                />
              </button>
              <button type='button'>
                <img
                  src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                  alt='Lar das meninas'
                />
              </button>
              <button type='button'>
                <img
                  src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                  alt='Lar das meninas'
                />
              </button>
              <button type='button'>
                <img
                  src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                  alt='Lar das meninas'
                />
              </button>
              <button type='button'>
                <img
                  src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                  alt='Lar das meninas'
                />
              </button>
              <button type='button'>
                <img
                  src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                  alt='Lar das meninas'
                />
              </button>
            </div>

            <div className='pet-details-content'>
              <h1>Cachorro Caraleo</h1>

              <div className='info-pet'>
                <p>
                  Espécie:<span></span>
                </p>
                <p>
                  Raça: <span></span>
                </p>
                <p>
                  Idade:<span></span>
                </p>
                <p>
                  Sexo: <span></span>
                </p>
                <p>
                  Castrado: <span></span>
                </p>
                <p>
                  Cor: <span></span>
                </p>
                <p>
                  Vacinas: <span></span>
                </p>
                <p>
                  Comportamento c/ crianças: <span></span>
                </p>
              </div>

              <hr />

              <h2>Informação do doador</h2>
              <p>
                Nome: <span></span>
              </p>
              <p>
                E-mail: <span></span>
              </p>

              <hr />

              <h2>Endereço do doador</h2>
              <div className='map-container'>
                <Map
                  interactive={false}
                  center={[-27.2092052, -49.6401092]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                >
                  <Marker
                    interactive={false}
                    icon={locationIcon}
                    position={[-27.2092052, -49.6401092]}
                  />
                </Map>

                <footer>
                  <a href=''>Ver rotas no Google Maps</a>
                </footer>
              </div>

              <hr />

              <h2>Informações complementares</h2>

              <div className='open-details'>
                <div className='hour'>
                  <FiClock size={32} color='#15B6D6' />
                  Segunda à Sexta <br />
                  8h às 18h
                </div>
                <div className='open-on-weekends'>
                  <FiInfo size={32} color='#39CC83' />
                  Atendemos <br />
                  fim de semana
                </div>
              </div>

              <PrimaryButton type='button'>
                {isDarkMode ? (
                  <FaWhatsapp size={25} color='rgba(0, 0, 0, 0.6)' />
                ) : (
                  <FaWhatsapp size={25} color='rgba(225, 225, 255, 1)' />
                )}
                Entrar em contato
              </PrimaryButton>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Pet;
