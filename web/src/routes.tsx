import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import PetzMap from './pages/PetzMap';
import RegistrationPets from 'pages/RegistrationPets';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/app' element={<PetzMap />} />
        <Route path='/registration-pets' element={<RegistrationPets />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
