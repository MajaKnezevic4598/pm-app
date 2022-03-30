import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Account from '../components/Account/Account';
import Header from '../components/Header/Header';
import PMHome from '../components/PMHome/PMHome';

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
          <Route path="/" element={<PMHome />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PMRoutes;
