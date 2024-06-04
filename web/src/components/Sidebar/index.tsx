import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import mapMarketIcon from '../../assets/MapMarket/mapIcon-light.png';

import { useTheme } from 'context/ThemeContext';

import './styles.css';

const Sidebar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <aside className='sidebar'>
      <img src={mapMarketIcon} alt='PetzMap' />

      <footer>
        <button type='button' onClick={() => navigate(-1)}>
          {isDarkMode ? (
            <FiArrowLeft size={32} color='rgba(0, 0, 0, 0.6)' />
          ) : (
            <FiArrowLeft size={32} color='rgba(225, 225, 255, 1)' />
          )}
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
