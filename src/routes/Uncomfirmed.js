import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Uncomfirmed from '../components/Uncomfirmed/Uncomfirmed';

const PMRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{ width: '100%', height: '4.5em' }}
          className="spacer"
        ></div>
        <Routes>
          <Route path="/" element={<Uncomfirmed />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PMRoutes;
