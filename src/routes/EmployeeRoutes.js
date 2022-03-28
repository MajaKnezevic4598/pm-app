import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import EmployeeHome from "../components/EmployeeHome/EmployeeHome";
import Header from "../components/Header/Header";

const EmployeeRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{ width: "100%", height: "4.5em" }}
          className="spacer"
        ></div>
        <Routes>
          <Route path="/" element={<EmployeeHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default EmployeeRoutes;
