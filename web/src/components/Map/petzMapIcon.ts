import L from 'leaflet';
import mapMarketImg from '../../assets/Map/map-market.svg';

export default L.icon({
  iconUrl: mapMarketImg,

  iconSize: [24, 24],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});
