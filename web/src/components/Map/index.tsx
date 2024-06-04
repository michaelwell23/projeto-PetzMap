import React from 'react';

import { Map as LeafletMap, MapProps as LeafletMapProps } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

interface MapProps extends LeafletMapProps {
  interactive?: boolean;
  children: React.ReactNode;
}

const Map = ({ children, interactive = true, ...props }: MapProps) => {
  console.log('Mapbox token:', process.env.REACT_APP_MAPBOX_TOKEN);
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
      {children}
    </LeafletMap>
  );
};

export default Map;
