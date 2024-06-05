import React from 'react';
import { Marker, TileLayer } from 'react-leaflet';

import { FiPlus } from 'react-icons/fi';

import PrimaryButton from 'components/PrimaryButton';
import Sidebar from 'components/Sidebar';

import { useTheme } from 'context/ThemeContext';

import Map from 'components/Map';
import getLocationIcon from 'components/Map/petzMapIcon';

import './styles.css';

const RegistrationPets = () => {
  const { isDarkMode } = useTheme();

  const locationIcon = getLocationIcon(isDarkMode);

  return (
    <>
      <div id='page-registration-pets'>
        <Sidebar />

        <main>
          <form className='register-pet-form'>
            <fieldset>
              <legend>Dados</legend>

              <Map style={{ width: '100%', height: 280 }}>
                <Marker
                  interactive={false}
                  icon={locationIcon}
                  position={[-27.2092052, -49.6401092]}
                />
              </Map>

              <div className='input-block'>
                <label htmlFor='name'>Nome</label>
                <input id='name' />
              </div>

              <div className='input-block'>
                <label htmlFor='phone'>
                  WhatsApp <span>Para + Informações</span>
                </label>
                <input id='phone' />
              </div>

              <div className='input-block'>
                <label htmlFor='about'>
                  Sobre <span>Máximo de 300 caracteres</span>
                </label>
                <textarea id='name' maxLength={300} />
              </div>

              <div className='input-block'>
                <label htmlFor='images'>Fotos do pet</label>

                <div className='uploaded-image'></div>

                <button className='new-image'>
                  <FiPlus size={24} color='#fae3a4' />
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend>Informações sobre o Cachorro</legend>

              <div className='input-block'>
                <label htmlFor='pet-name'>Nome do Pet</label>
                <input id='pet-name' />
              </div>

              <div className='input-block'>
                <label htmlFor='age-pet'>Idade do Animal</label>
                <input id='age-pet' />
              </div>

              <div className='input-block'>
                <label htmlFor='instructions'>Informe como será a doação</label>
                <textarea id='instructions' />
              </div>

              <div className='input-block'>
                <label htmlFor='open_on_weekends'>Atendimento aos semana</label>

                <div className='button-select'>
                  <button type='button' className='active'>
                    Sim
                  </button>
                  <button type='button'>Não</button>
                </div>
              </div>
            </fieldset>

            <PrimaryButton type='submit'>Confirmar</PrimaryButton>
          </form>
        </main>
      </div>
    </>
  );
};

export default RegistrationPets;
