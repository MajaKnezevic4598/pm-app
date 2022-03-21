import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminAccept from '../components/AdminAccept/AdminAccept';

const AdminRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminAccept />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AdminRoutes;
