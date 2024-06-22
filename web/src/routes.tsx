import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from 'pages/Landing';
import PetzMap from 'pages/PetzMap';
import RegistrationPets from 'pages/RegistrationPets';
import Pet from 'pages/Pet';
import ConfirmDonation from 'pages/ConfirmPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/app' element={<PetzMap />} />
        <Route path='/registration-pets' element={<RegistrationPets />} />
        <Route path='/pet/:id' element={<Pet />} />
        <Route path='/pet/:id' element={<Pet />} />
        <Route path='/confirmDonation/:id' element={<ConfirmDonation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
