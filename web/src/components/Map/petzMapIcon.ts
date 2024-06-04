import L from 'leaflet';

import locationDark from '../../assets/MapMarket/location-dark.png';
import locationLight from '../../assets/MapMarket/location-light.png';

const getLocationIcon = (isDarkMode: boolean) => {
  const iconUrl = isDarkMode ? locationDark : locationLight;

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [58, 58],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });
};

export default getLocationIcon;
