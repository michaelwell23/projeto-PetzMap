import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Marker } from 'react-leaflet';

import { FaWhatsapp } from 'react-icons/fa';

import PrimaryButton from 'components/PrimaryButton';
import Sidebar from 'components/Sidebar';
import Map from 'components/Map';

import { useTheme } from 'context/ThemeContext';

import getLocationIcon from 'components/Map/petzMapIcon';

import './styles.css';
import api from 'services/api';

interface PetData {
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  ad_title: string;
  species: string;
  breed: string;
  sex: string;
  castrated: string;
  color_animal: string;
  info_pet: string;
  info_donation: string;
  images: Array<{
    url: string;
    id: number;
  }>;
}

interface PetParams extends Record<string, string | undefined> {
  id: string;
}

const Pet: React.FC = () => {
  const { isDarkMode } = useTheme();

  const params = useParams<PetParams>();

  const [pet, setPet] = useState<PetData | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const locationIcon = getLocationIcon(isDarkMode);

  useEffect(() => {
    api.get(`/pets/${params.id}`).then((response) => {
      setPet(response.data);
    });
  }, [params.id]);

  if (!pet) {
    return <p>Carregando...</p>;
  }

  const handleContactClick = async () => {
    try {
      await api.post(`/pets/${params.id}/contact`);

      window.open(`https://wa.me/${pet.whatsapp}`, '_blank');

      alert('Redirecionando para WhatsApp...');
    } catch (error) {
      alert('Erro ao enviar e-mail.');
    }
  };

  return (
    <>
      <div id='page-pet'>
        <Sidebar />

        <main>
          <div className='pet-details'>
            {pet.images.length > 0 && (
              <img src={pet.images[activeImageIndex].url} alt={pet.ad_title} />
            )}

            <div className='images'>
              {pet.images.map((image, index) => (
                <button
                  className={activeImageIndex === index ? 'active' : ''}
                  type='button'
                  key={image.id}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image.url} alt={pet.name} />
                </button>
              ))}
            </div>

            <div className='pet-details-content'>
              <h1>{pet.ad_title}</h1>

              <div className='info-pet'>
                <p>
                  Espécie: <span>{pet.species}</span>
                </p>
                <p>
                  Raça: <span>{pet.breed}</span>
                </p>
                <p>
                  Sexo: <span>{pet.sex}</span>
                </p>
                <p>
                  Castrado: <span>{pet.castrated}</span>
                </p>
                <p>
                  Cor: <span>{pet.color_animal}</span>
                </p>
              </div>

              <p>{pet.info_pet}</p>

              <hr />

              <h2>Informação do doador</h2>
              <p>
                Nome: <span>{pet.name}</span>
              </p>
              <p>
                E-mail: <span>{pet.email}</span>
              </p>

              <hr />

              <h2>Endereço do doador</h2>
              <div className='map-container'>
                <Map
                  center={[pet.latitude || 0, pet.longitude || 0]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <Marker
                    interactive={false}
                    icon={locationIcon}
                    position={[pet.latitude, pet.longitude]}
                  />
                </Map>

                <footer>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`https://www.google.com/maps/dir/?api=1&destination=${pet.latitude},${pet.longitude}`}
                  >
                    Ver rotas no Google Maps
                  </a>
                </footer>
              </div>

              <hr />

              <h2>Informações complementares</h2>

              <div className='open-details'>
                <p>{pet.info_donation}</p>
              </div>

              <PrimaryButton type='button' onClick={handleContactClick}>
                {isDarkMode ? (
                  <FaWhatsapp size={25} color='rgba(0, 0, 0, 0.6)' />
                ) : (
                  <FaWhatsapp size={25} color='rgba(225, 225, 255, 1)' />
                )}
                <a href={`https://wa.me/${pet.whatsapp}`}>Entrar em contato</a>
              </PrimaryButton>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Pet;
