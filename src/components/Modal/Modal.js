import React, { Component, useContext, useEffect, useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';
const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={'modal'}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        <div className="modal__text">
          Are you sure you want to do this?
          <br /> This action cannot be undone.
        </div>
        <div className="modal__buttons">
          <button className="modal__buttons__cancel" onClick={props.clickFirst}>
            CANCEL
          </button>
          <button
            className="modal__buttons__delete"
            onClick={props.clickSecond}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
