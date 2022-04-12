import { useState, useEffect } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";
const DeleteProjectModal = (props) => {
  const [input, setInput] = useState("");

  const toCheck = `${props.projectManager}/${props.projectName}`;

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //ne moze da se menja state na unmouted component, stavicu da state bude prazan nakon submitovanja,

  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={"modal"}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal__text">
          Are you sure you wanto to delete project{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            {props.projectName}
          </span>
          ?{/* <br /> This action cannot be undone. */}
          <div>Enter following data do delete the project:</div>
          <div>
            <span>{props.projectManager}</span>/<span>{props.projectName}</span>
          </div>
          <input type="text" value={input} onChange={handleChange} />
        </div>
        <div className="modal__buttons">
          <button className="modal__buttons__cancel" onClick={props.clickFirst}>
            CANCEL
          </button>
          <button
            className="modal__buttons__delete"
            disabled={toCheck !== input}
            onClick={props.clickSecond}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProjectModal;
