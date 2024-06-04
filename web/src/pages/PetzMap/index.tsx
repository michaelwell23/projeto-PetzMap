import React from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import { FiArrowRight, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';

import { useTheme } from 'context/ThemeContext';

import Map from 'components/Map';
import mapMarketImg from '../../assets/MapMarket/mapIcon-light.png';
import locationLight from '../../assets/MapMarket/location-light.png';
import locationDark from '../../assets/MapMarket/location-dark.png';

import './styles.css';

const getLocationIcon = (isDarkMode: boolean) => {
  const iconUrl = isDarkMode ? locationDark : locationLight;

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [58, 58],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });
};

const PetzMap = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const locationIcon = getLocationIcon(isDarkMode);

  return (
    <div id='page-map' className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <aside>
        <header>
          <img src={mapMarketImg} alt='Petz' />
          <button onClick={toggleTheme} className='theme-toggle-button'>
            {isDarkMode ? (
              <FaMoon size={26} color='rgba(225, 225, 255, 1)' />
            ) : (
              <FaSun size={26} color='rgba(0, 0, 0, 0.6)' />
            )}
          </button>
        </header>

        <div className='content-text'>
          <h2>Veja os animais disponíveis no Mapa</h2>
          <p>
            Há muitos pets esperando pelo seu carinho <span>❤</span>
          </p>
        </div>

        <footer>
          <div className='backButton'>
            <Link to='/'>
              {isDarkMode ? (
                <FiArrowLeft size={35} color='rgba(225, 225, 255, 1)' />
              ) : (
                <FiArrowLeft size={35} color='rgba(0, 0, 0, 0.6)' />
              )}
            </Link>
          </div>
          <div className='locale'>
            <strong>Salto,</strong>
            <span>São Paulo</span>
          </div>
        </footer>
      </aside>

      <Map
        style={{ width: '100%', height: '100%' }}
        center={[-27.2092052, -49.6401092]}
        zoom={15}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${
            isDarkMode ? 'dark-v10' : 'light-v10'
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${
            process.env.REACT_APP_MAPBOX_TOKEN
          }`}
        />
        <Marker icon={locationIcon} position={[-27.2092052, -49.6401092]}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className='map-popup'
          >
            Cachorro Caramelo
            <Link to={`/pet/1`}>
              {isDarkMode ? (
                <FiArrowRight size={20} color='rgba(0, 0, 0, 0.6)' />
              ) : (
                <FiArrowRight size={20} color='rgba(225, 225, 255, 1)' />
              )}
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to='/registration-pets' className='register-pet'>
        {isDarkMode ? (
          <FiPlus size={32} color='rgba(0, 0, 0, 0.6)' />
        ) : (
          <FiPlus size={32} color='rgba(225, 225, 255, 1)' />
        )}
      </Link>
    </div>
  );
};

export default PetzMap;
