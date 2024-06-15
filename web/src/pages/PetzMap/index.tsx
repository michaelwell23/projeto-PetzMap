import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';

import { useTheme } from 'context/ThemeContext';
import { useLocation } from 'context/LocationContext';

import api from 'services/api';

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

interface Image {
  url: string;
  urlMobile: string;
}

interface Pets {
  id: number;
  ad_title: string;
  latitude: number;
  longitude: number;
  images: Image[];
}

const PetzMap = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { city, state, latitude, longitude } = useLocation();

  const [pets, setPets] = useState<Pets[]>([]);

  const locationIcon = getLocationIcon(isDarkMode);

  useEffect(() => {
    api.get('pets').then((response) => {
      setPets(response.data);
    });
  }, []);

  return (
    <div id='page-map' className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <aside>
        <header>
          <img src={mapMarketImg} alt='Petz' />
          <button onClick={toggleTheme} className='theme-toggle-button'>
            {isDarkMode ? (
              <FaSun size={26} color='rgba(225, 225, 255, 1)' />
            ) : (
              <FaMoon size={26} color='rgba(0, 0, 0, 0.6)' />
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
            <strong>{city}</strong>
            <span>{state}</span>
          </div>
        </footer>
      </aside>

      <Map
        style={{ width: '100%', height: '100%' }}
        center={[latitude || 0, longitude || 0]}
        zoom={15}
      >
        {pets.map((pet) => {
          const petImage = pet.images.length > 0 ? pet.images[0].url : '';

          return (
            <Marker
              icon={locationIcon}
              position={[pet.latitude, pet.longitude]}
              key={pet.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className='map-popup'
              >
                <img src={petImage} alt={pet.ad_title} />

                <div className='info'>
                  {pet.ad_title}
                  <Link to={`/pet/${pet.id}`}>
                    {isDarkMode ? (
                      <FiArrowRight size={20} color='rgba(0, 0, 0, 0.6)' />
                    ) : (
                      <FiArrowRight size={20} color='rgba(225, 225, 255, 1)' />
                    )}
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
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
