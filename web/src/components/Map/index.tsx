import React, { useEffect } from 'react';
import {
  Map as LeafletMap,
  MapProps as LeafletMapProps,
  TileLayer,
} from 'react-leaflet';
import { useTheme } from 'context/ThemeContext';
import 'leaflet/dist/leaflet.css';

interface MapProps extends LeafletMapProps {
  interactive?: boolean;
  children: React.ReactNode;
  onClick?: (event: any) => void;
}

const Map = ({ children, interactive = true, onClick, ...props }: MapProps) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (onClick) {
      const map = document.querySelector('.leaflet-container');
      if (map) {
        map.addEventListener('click', onClick);
      }
      return () => {
        if (map) {
          map.removeEventListener('click', onClick);
        }
      };
    }
  }, [onClick]);

  return (
    <LeafletMap
      center={[-23.200928, -47.294776]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/${
          isDarkMode ? 'navigation-preview-night-v4' : 'light-v10'
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${
          process.env.REACT_APP_MAPBOX_TOKEN
        }`}
      />
      {children}
    </LeafletMap>
  );
};

export default Map;
