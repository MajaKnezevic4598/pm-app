import React, { useEffect, useState } from "react";
import { useNoteData } from "../../hooks/useNoteData";

import "./SingleNote.scss";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axiosInstance from "../../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./SingleNote.scss";
import Modal from "../Modal/Modal";
import uuid from "react-uuid";

const SingleNote = (props) => {
  const navigate = useNavigate();
  const [isModalOn, setIsModalOn] = useState(false);
  const [docs, setDocs] = useState([]);

  const toggleDeleteModal = async () => {
    setIsModalOn(true);
  };

  const deleteNote = async () => {
    await axiosInstance.delete("/notes/" + props.id);
    props.refetch();
  };

  const editNote = () => {
    navigate("/edit-note/" + props.id);
  };

  const closeModal = () => {
    setIsModalOn(false);
  };

  const checkExtension = (data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].attributes.ext);
      // setDocs([...docs, `${data[i].attributes.ext}`]);
      setDocs((prev) => {
        return [...prev, `${data[i].attributes.ext}`];
      });
      console.log(docs);
    }
  };
  useEffect(() => {
    if (props.files) {
      checkExtension(props.files);
    }
  }, [props?.files]);

  return (
    <div className="note">
      <div className="note__content">
        <div className="right-buttons">
          <p onClick={editNote} className="edit">
            Edit
          </p>
          <BiEdit onClick={editNote} className="sm-icon" />
          <div onClick={toggleDeleteModal} style={{ display: "flex" }}>
            <p className="delete">Delete</p>
            <MdDelete className="sm-icon red" />
          </div>
        </div>
        <div className="note__head">
          <h4 className="title">{props.name}</h4>
          <div>Note title:</div>
        </div>
        <div className="note__description">
          {" "}
          <div>
            <p className="description"> {props.description}</p>
          </div>
          <div>Note description:</div>
        </div>

        <div className="note__footer">
          <img
            className="footer-img"
            src={"https://pm-app-bek.herokuapp.com" + props.photo}
            alt="profile-photo"
          />
          <p className="footer-pmName">{props.pmName}</p>
          <div className="footer-details">Project manager:</div>
        </div>
        <div className="note-docs">
          {docs.length > 0 && docs.map((doc) => <div key={uuid()}>{doc}</div>)}
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
