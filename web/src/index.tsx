import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
