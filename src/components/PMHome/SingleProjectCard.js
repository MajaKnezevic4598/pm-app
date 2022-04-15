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
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/${id}/notes`);
      }}
    >
      <div className="card__project-info">
        {projectLogo && projectLogo !== null ? (
          <img
            className="card__project-logo"
            src={`https://pm-app-bek.herokuapp.com${projectLogo}`}
            alt="projectLogo"
          />
        ) : (
          <img src={img} className="card__project-logo" alt="projectLogo" />
        )}
        <h2>{prName}</h2>
        <div className="project-details">Project details:</div>
      </div>
      <div className="card__prmanger-info">
        {pmImage ? (
          <img
            src={`https://pm-app-bek.herokuapp.com${pmImage}`}
            alt="neka"
            className="project-manager-image"
          />
        ) : (
          <img src={img} alt="default" className="project-manager-image" />
        )}

        <h3>{manager}</h3>
      </div>
      <div className="card__employee-info">
        {employees} employees
        {/* <MdOpenInNew
          className="card__employee-info"
          onClick={(e) => {
            e.stopPropagation();
            console.log("kliknuto");
            navigate(`/${projectId}/notes/edit-project`);
          }}
        /> */}
        {/* <p>{employees} employees</p> */}
      </div>
    </div>
  );
};

export default SingleProjectCard;
