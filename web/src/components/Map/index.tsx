import React from 'react';

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
}

const Map = ({ children, interactive = true, ...props }: MapProps) => {
  const { isDarkMode } = useTheme();

  return (
    <LeafletMap
      center={[-27.2092052, -49.6401092]}
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
          isDarkMode ? 'dark-v10' : 'light-v10'
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${
          process.env.REACT_APP_MAPBOX_TOKEN
        }`}
      />
      {children}
    </LeafletMap>
  );
};

export default Map;
