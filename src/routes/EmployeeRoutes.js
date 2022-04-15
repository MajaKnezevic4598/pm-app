import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Account from '../components/Account/Account';
import EmployeeHome from '../components/EmployeeHome/EmployeeHome';
import Header from '../components/Header/Header';
import EmployeeProjectView from '../components/EmployeeHome/EmployeeProjectView';

const EmployeeRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{ width: '100%', height: '4.5em' }}
          className="spacer"
        ></div>
        <Routes>
          <Route path="/" element={<EmployeeHome />} />
          <Route path="/account" element={<Account />} />
          <Route path="/project/:id" element={<EmployeeProjectView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default EmployeeRoutes;
