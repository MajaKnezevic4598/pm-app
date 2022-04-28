import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import BackdropModal from "../Backdrop/BackdropModul";
import "./DeleteProjectModal.scss";
import { useNavigate } from "react-router";

const DeleteProjectModal = (props) => {
  const toCheck = `${props.projectManager}/${props.projectName}`;
  const navigate = useNavigate();

  const { isOpen, setIsOpen, input, setInput, closeModal, deleteProject } =
    useContext(ModalContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <BackdropModal show={isOpen} />

      <div className={isOpen ? "modal open" : "modal close"}>
        <div className="modal__text">
          Are you sure you wanto to delete project
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            {props.projectName}
          </span>
          ?<div>Enter following data do delete the project:</div>
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
