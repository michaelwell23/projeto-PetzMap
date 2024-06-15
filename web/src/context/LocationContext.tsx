import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import axios from 'axios';

interface LocationContextData {
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
}

interface LocationProviderProps {
  children: ReactNode;
}

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData
);

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          try {
            const response = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`
            );
            const { locality, principalSubdivision } = response.data;

            setCity(locality); // Usando 'locality' em vez de 'city'
            setState(principalSubdivision);
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        });
      }
    };

    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ city, state, latitude, longitude }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextData => {
  return useContext(LocationContext);
};
