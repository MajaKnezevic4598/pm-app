import { useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import BackdropModal from "../Backdrop/BackdropModul";
// import Backdrop from "../Backdrop/Backdrop";
import "./DeleteProjectModal.scss";
import { useNavigate } from "react-router";

// const { loggedIn } = useContext(AuthContext);

const DeleteProjectModal = (props) => {
  // const [input, setInput] = useState("");

  const toCheck = `${props.projectManager}/${props.projectName}`;
  const navigate = useNavigate();

  const { isOpen, setIsOpen, input, setInput, closeModal, deleteProject } =
    useContext(ModalContext);
  console.log(isOpen);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //ne moze da se menja state na unmouted component, stavicu da state bude prazan nakon submitovanja,

  return (
    <>
      <BackdropModal show={isOpen} />

      <div
        // className={"modal"}
        className={isOpen ? "modal open" : "modal close"}
        // isOpentyle={{
        //   transform: `${isOpen}` ? "translateY(0)" : "translateY(-100vh)",
        //   opacity: `${isOpen}` ? "1" : "0",
        // }}
      >
        <div className="modal__text">
          Are you sure you wanto to delete project <span>{`${isOpen}`}</span>
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
          <button
            className="modal__buttons__cancel"
            onClick={() => {
              closeModal();
            }}
          >
            CANCEL
          </button>
          <button
            className="modal__buttons__delete"
            disabled={toCheck !== input}
            onClick={() => {
              deleteProject(props.projectId);
              navigate("/");
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProjectModal;
