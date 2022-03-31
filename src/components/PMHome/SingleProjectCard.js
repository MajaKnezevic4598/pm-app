import "./SingleProjectCard.scss";
import img from "../../assets/av.png";
import img1 from "../../assets/av1.png";
import { MdOpenInNew } from "react-icons/md";
import Modal from "react-modal";
import { useState } from "react";
import { FiXSquare } from "react-icons/fi";

Modal.setAppElement("#root");

const SingleProjectCard = ({
  manager,
  prName,
  pmImage,
  projectLogo,
  employees,
  projectDescription,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="card">
      <div className="card__img-conteiner">
        {projectLogo ? (
          <img
            className="card__project-logo"
            src={`https://pm-app-bek.herokuapp.com${projectLogo}`}
            alt="projectLogo"
          />
        ) : (
          <img src={img} className="card__project-logo" alt="projectLogo" />
        )}
      </div>
      <div className="card__info-1">
        <h2>{prName}</h2>
        <div>
          {pmImage ? (
            <img
              src={`https://pm-app-bek.herokuapp.com${pmImage}`}
              alt="neka"
              className="project-manager-image"
            />
          ) : (
            <img src={img} alt="default" />
          )}

          <span>{manager}</span>
        </div>
      </div>
      <div className="card__info-2">
        <MdOpenInNew
          className="card__info-2__icon"
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
        <p>{employees} employees</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="Modal__conteiner">
          <section className="modal-main-section">
            <div>
              {/* <img src={img} alt="" className="modal-main-section__img" /> */}

              {projectLogo ? (
                <img
                  className="modal-main-section__img"
                  src={`https://pm-app-bek.herokuapp.com${projectLogo}`}
                  alt="projectLogo"
                />
              ) : (
                <img
                  src={img}
                  className="modal-main-section__img"
                  alt="projectLogo"
                />
              )}
            </div>
            <div className="modal-main-section__project-desc">
              <h3>{prName}</h3>
              <p>{projectDescription}</p>
            </div>
            <div className="modal-main-section__manager-info">
              <h4>Project Manager</h4>
              <div className="images-conteiner">
                <img src={img} alt="project-manager-img" />
                <img src={img1} alt="project-manager-img" />
                <img src={img} alt="project-manager-img" />
              </div>
            </div>
            <div>Employees</div>
          </section>
          <h1>title</h1>
          <p>body</p>
        </div>

        <FiXSquare
          className="btn-close"
          onClick={() => {
            setModalIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default SingleProjectCard;
