import React from "react";
import { useContext } from "react";
import classes from "./Backdrop.module.css";
import { ModalContext } from "../../context/ModalContext";

const BackdropModal = (props) => {
  const { closeModal } = useContext(ModalContext);

  return (
    <>
      {props.show && (
        <div className={classes.Backdrop} onClick={() => closeModal()}></div>
      )}
    </>
  );
};

export default BackdropModal;
