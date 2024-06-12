import React from 'react';
import { Marker } from 'react-leaflet';

import { useTheme } from 'context/ThemeContext';

import PrimaryButton from 'components/PrimaryButton';
import Sidebar from 'components/Sidebar';
import Input from 'components/Input';

import Map from 'components/Map';
import getLocationIcon from 'components/Map/petzMapIcon';
import Select from 'components/Select/index';
import ImageUploader from 'components/SelectImage';

import './styles.css';

const RegistrationPets = () => {
  const { isDarkMode } = useTheme();

  const locationIcon = getLocationIcon(isDarkMode);

  // const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [whatsapp, setWhatsapp] = useState('');
  // const [addTitle, setAddTitle] = useState('');
  // const [species, setSpecies] = useState('');
  // const [breed] = useState('');
  // const [sex] = useState('');
  // const [castrated] = useState('');
  // const [colorAnimal] = useState('');
  // const [infoPet] = useState('');
  // const [infoDonation] = useState('');
  // const [images, setImages] = useState<File[]>([]);
  // const [previewImages, setPreviewImages] = useState<string[]>([]);

  // function handleMapClick(event: LeafletMouseEvent) {
  //   const { lat, lng } = event.latlng;

  //   setPosition({
  //     latitude: lat,
  //     longitude: lng,
  //   });
  // }

  // async function handleSubmit(){}

  return (
    <>
      <div id='page-registration-pets'>
        <Sidebar />

        <main>
          <form className='register-pet-form'>
            <fieldset>
              <legend>Dados do doador</legend>

              <Input id='name' label='Nome' />
              <Input id='email' label='E-mail' />
              <Input id='whatsapp' label='Whatsapp' />

              <br />

              <span className='map-info'>Selecione no mapa o seu endereço</span>
              <Map style={{ width: '100%', height: 280 }}>
                <Marker
                  interactive={false}
                  icon={locationIcon}
                  position={[-27.2092052, -49.6401092]}
                />
              </Map>
            </fieldset>
            <fieldset>
              <legend>Informações sobre o Pet</legend>

              <ImageUploader />

              <Input id='pet-name' label='Nome do Pet' />
              <Input id='species' label='Espécie' />

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
                onChange={() => {}}
              />

              <Input id='race' label='Raça' />

              <Select
                id='example-select'
                label='Selecione o sexo do animal'
                options={[
                  { value: 'Macho', label: 'Macho' },
                  { value: 'Biologia', label: 'Fêmea' },
                ]}
                onChange={() => {}}
              />

              <Select
                id='example-select'
                label='O animal é castrado?'
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'não', label: 'Não' },
                  { value: 'Não sei', label: 'Não sei informar' },
                ]}
                onChange={() => {}}
              />

              <Input id='color' label='Cor do animal' />

              <div className='input-block '>
                <label htmlFor='instructions info'>
                  + informações sobre o pet
                  <span>Informe o comportamento do animal.</span>
                </label>
                <textarea id='instructions' />
              </div>

              <div className='input-block'>
                <label htmlFor='instructions'>Informe como será a doação</label>
                <textarea id='instructions' />
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
