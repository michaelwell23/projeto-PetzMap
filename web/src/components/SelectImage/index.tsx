import React from 'react';

import { FiPlus } from 'react-icons/fi';

import './styles.css';
import { useTheme } from 'context/ThemeContext';

const ImageUploader: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className='input-block'>
      <label htmlFor='images'>Selecione 1 ou mais fotos do pet</label>

      <div className='uploaded-image'></div>

      <button className='new-image'>
        {isDarkMode ? (
          <FiPlus size={26} color='rgba(225, 225, 255, 1)' />
        ) : (
          <FiPlus size={26} color='#5c8599' />
        )}
      </button>
    </div>
  );
};

export default ImageUploader;
