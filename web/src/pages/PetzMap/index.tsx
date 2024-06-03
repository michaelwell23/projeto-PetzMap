import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import { FiArrowRight, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';

import Map from 'components/Map';
import mapMarketImg from '../../assets/MapMarket/mapIcon-light.png';
import location from '../../assets/MapMarket/location.png';

import './styles.css';

const locationIcon = L.icon({
  iconUrl: location,
  iconSize: [58, 58],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const PetzMap = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

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
            <Link to={`/create/1`}>
              <FiArrowRight size={20} color='#fff' />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to='/create' className='register-pet'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default PetzMap;
