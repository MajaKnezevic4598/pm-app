import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import PMHome from "../components/PMHome/PMHome";
import AddProject from "../components/PMHome/AddProject";
import Account from '../components/Account/Account';


const PMRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{ width: "100%", height: "4.5em" }}
          className="spacer"
        ></div>
        <Routes>
          <Route path="/" element={<PMHome />} />
          {/* <Route path="/projects/:id" element={<PMHome />} /> */}
          <Route path="add-project" element={<AddProject />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PMRoutes;
