import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { useTheme } from 'context/ThemeContext';

import { FiPlus } from 'react-icons/fi';

import getLocationIcon from 'components/Map/petzMapIcon';
import PrimaryButton from 'components/PrimaryButton';
import Select from 'components/Select/index';
import Sidebar from 'components/Sidebar';
import Input from 'components/Input';

import api from 'services/api';

import './styles.css';
import { useLocation } from 'context/LocationContext';

const RegistrationPets = () => {
  const { isDarkMode } = useTheme();
  const { latitude, longitude } = useLocation();

  const navigate = useNavigate();

  const locationIcon = getLocationIcon(isDarkMode);

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [ad_title, setAdTitle] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [castrated, setCastrated] = useState('');
  const [color_animal, setcolorAnimal] = useState('');
  const [info_pet, setInfoPet] = useState('');
  const [info_donation, setInfoDonation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('ad_title', ad_title);
    data.append('species', species);
    data.append('breed', breed);
    data.append('sex', sex);
    data.append('castrated', castrated);
    data.append('color_animal', color_animal);
    data.append('info_pet', info_pet);
    data.append('info_donation', info_donation);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach((image) => {
      data.append('images', image);
    });

    await api.post('pets', data);

    alert('Cadastro realizado com Sucesso!');

    navigate('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <>
      <div id='page-registration-pets'>
        <Sidebar />

        <main>
          <form onSubmit={handleSubmit} className='register-pet-form'>
            <fieldset>
              <legend>Dados do doador</legend>

              <Input
                id='name'
                value={name}
                htmlForm={name}
                onChange={(e) => setName(e.target.value)}
                label='Nome'
              />

              <Input
                id='email'
                value={email}
                htmlForm={email}
                onChange={(e) => setEmail(e.target.value)}
                label='E-mail'
              />

              <Input
                id='whatsapp'
                value={whatsapp}
                htmlForm={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                label='Whatsapp (para contato)'
              />
              <br />

              <span className='map-info'>Selecione no mapa o seu endereço</span>

              <Map
                center={[latitude || 0, longitude || 0]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/${
                    isDarkMode ? 'navigation-preview-night-v4' : 'light-v10'
                  }/tiles/256/{z}/{x}/{y}@2x?access_token=${
                    process.env.REACT_APP_MAPBOX_TOKEN
                  }`}
                />
                {position.latitude != 0 && (
                  <Marker
                    interactive={false}
                    icon={locationIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
              </Map>
            </fieldset>
            <fieldset>
              <legend>Informações sobre o Pet</legend>

              <div className='input-block'>
                <label htmlFor='images'>Fotos</label>

                <div className='images-container'>
                  {previewImages.map((image) => {
                    return <img key={image} src={image} alt={name} />;
                  })}

                  <label htmlFor='image[]' className='new-image'>
                    {isDarkMode ? (
                      <FiPlus size={26} color='rgba(225, 225, 255, 1)' />
                    ) : (
                      <FiPlus size={26} color='#5c8599' />
                    )}
                  </label>
                </div>

                <input
                  multiple
                  onChange={handleSelectImages}
                  type='file'
                  id='image[]'
                />
              </div>

              <Input
                id='ad_title'
                value={ad_title}
                htmlForm={ad_title}
                onChange={(e) => setAdTitle(e.target.value)}
                label='Titulo do Anuncio'
              />

              <Select
                id='example-select'
                label='Selecione a espécie'
                options={[
                  { value: 'cachorro', label: 'Cachorro' },
                  { value: 'gato', label: 'Gato' },
                  { value: 'coelho', label: 'Coelho' },
                  { value: 'galo', label: 'Galo' },
                  { value: 'hamster', label: 'Hamster' },
                  { value: 'porquinho da india', label: 'Porquinho-da-Índia' },
                  { value: 'pássaro', label: 'Pássaro' },
                  { value: 'peixe', label: 'Peixe' },
                ]}
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />

              <Input
                id='race'
                label='Raça'
                value={breed}
                htmlForm={breed}
                onChange={(e) => setBreed(e.target.value)}
              />

              <Select
                id='example-select'
                label='Selecione o sexo do animal'
                options={[
                  { value: 'Macho', label: 'Macho' },
                  { value: 'Biologia', label: 'Fêmea' },
                ]}
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />

              <Select
                id='example-select'
                label='O animal é castrado?'
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'não', label: 'Não' },
                  { value: 'Não sei', label: 'Não sei informar' },
                ]}
                value={castrated}
                onChange={(e) => setCastrated(e.target.value)}
              />

              <Input
                id='color'
                label='Cor do animal'
                value={color_animal}
                htmlForm={color_animal}
                onChange={(e) => setcolorAnimal(e.target.value)}
              />

              <div className='input-block'>
                <label htmlFor='informações do pet'>Informações do Pet</label>
                <textarea
                  id='info_pet'
                  value={info_pet}
                  onChange={(e) => setInfoPet(e.target.value)}
                />
              </div>

              <div className='input-block'>
                <label htmlFor='informaçõe'>Instruções</label>
                <textarea
                  id='instructions'
                  value={info_donation}
                  onChange={(e) => setInfoDonation(e.target.value)}
                />
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
