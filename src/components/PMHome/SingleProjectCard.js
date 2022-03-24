import "./SingleProjectCard.scss";
import img from "../../assets/av.png";
import img1 from "../../assets/av1.png";
import { MdOpenInNew } from "react-icons/md";
import Modal from "react-modal";
import { useState } from "react";
import { FiXSquare } from "react-icons/fi";

Modal.setAppElement("#root");
const SingleProjectCard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="card">
      <div className="card__img-conteiner">
        <img className="card__image" src={img} alt="slika" />
      </div>
      <div className="card__info-1">
        <h2>Project Name</h2>
        <div>
          <img src={img} alt="" />
          <span>PM name</span>
        </div>
      </div>
      <div className="card__info-2">
        <MdOpenInNew
          className="card__info-2__icon"
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
        <p>16 employees</p>
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
              <img src={img} alt="" className="modal-main-section__img" />
            </div>
            <div className="modal-main-section__project-desc">
              <h3>Name of project</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              </p>
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
