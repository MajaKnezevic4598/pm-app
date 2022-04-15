import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Spinner from '../components/Spinner.js/Spinner';
import CleanHeader from '../components/Header/CleanHeader';
import AdminHeader from '../components/Header/AdminHeader';

const LoadingRoutes = (props) => {
  const role = localStorage.getItem('role');
  return (
    <>
      <BrowserRouter>
        {role === 'system_administrator' ? <AdminHeader /> : <Header />}
        <div
          style={{ width: '100%', height: '4.5em' }}
          className="spacer"
        ></div>
        <Routes>
          <Route path="/" element={<Spinner />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default LoadingRoutes;
