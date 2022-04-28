import React, { useState } from 'react';

import './SingleNote.scss';
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import axiosInstance from '../../helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './SingleNote.scss';
import Modal from '../Modal/Modal';

const SingleNote = (props) => {
  const navigate = useNavigate();
  const [isModalOn, setIsModalOn] = useState(false);

  const toggleDeleteModal = async () => {
    setIsModalOn(true);
  };

  const deleteNote = async () => {
    await axiosInstance.delete('/notes/' + props.id);
    props.refetch();
  };

  const editNote = () => {
    navigate('/edit-note/' + props.id);
  };

  const closeModal = () => {
    setIsModalOn(false);
  };

  return (
    <div className="note">
      <div className="note__content">
        <div className="right-buttons">
          <p onClick={editNote} className="edit">
            Edit
          </p>
          <BiEdit onClick={editNote} className="sm-icon" />
          <div onClick={toggleDeleteModal} style={{ display: 'flex' }}>
            <p className="delete">Delete</p>
            <MdDelete className="sm-icon red" />
          </div>
        </div>
        <div className="note__head">
          <p className="title">{props.name}</p>
        </div>
        <div className="note__description"> {props.description}</div>
        <div className="note__footer">
          <img
            className="footer-img"
            src={'https://pm-app-bek.herokuapp.com' + props.photo}
            alt="profile-photo"
          />
          <p className="footer-pmName">{props.pmName}</p>
        </div>
      </div>
      <Modal
        show={isModalOn}
        modalClosed={closeModal}
        clickFirst={closeModal}
        clickSecond={deleteNote}
      />
    </div>
  );
};

export default SingleNote;
