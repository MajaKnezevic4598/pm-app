import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

const UserRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        {/* Move Header To Admin Routes On Next Push */}
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default UserRoutes;
