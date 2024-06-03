import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import PetzMap from './pages/PetzMap';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/app' element={<PetzMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
