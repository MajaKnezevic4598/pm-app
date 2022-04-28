import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import PMHome from '../components/PMHome/PMHome';
import AddProject from '../components/PMHome/AddProject';
import Account from '../components/Account/Account';
import NotesView from '../components/PMHome/NotesView';
import EditNote from '../components/PMHome/EditNote';
import EditProject from '../components/PMHome/EditProject';

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
          {/* <Route path="/projects/:id" element={<PMHome />} /> */}
          <Route path="add-project" element={<AddProject />} />
          <Route path="/account" element={<Account />} />
          <Route path="/:id/notes" element={<NotesView />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="/:id/notes/edit-project" element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PMRoutes;
