import "./SingleProjectCard.scss";
import img from "../../assets/av.png";
import { MdOpenInNew } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const SingleProjectCard = ({
  manager,
  prName,
  pmImage,
  projectLogo,
  employees,
  projectDescription,
  projectId,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      id={`${projectId}`}
      onClick={() => navigate(`/${id}/notes`)}
    >
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
          onClick={(e) => {
            e.stopPropagation();
            console.log("kliknuto");
            navigate(`/${projectId}/notes/edit-project`);
          }}
        />
        <p>{employees} employees</p>
      </div>
    </div>
  );
};

export default SingleProjectCard;
