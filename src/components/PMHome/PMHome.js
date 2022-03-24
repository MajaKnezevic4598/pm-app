import React, { useState, useEffect } from "react";
import "./PMHome.scss";
import DefalutPr from "../../assets/rocket2.png";
import SingleProjectCard from "./SingleProjectCard";
import { useNavigate } from "react-router-dom";

const PMHome = () => {
  const [selectedProject, setSelectedProject] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);
  return (
    <div>
      <section className="top-section">
        <div className="top-section__conteiner">
          <div className="left-side">
            <img src={DefalutPr} alt="img" className="left-side__project-img" />
          </div>
          <div className="middle-side">
            <p>My Projects</p>
            <p>Here you will find all your projects</p>
          </div>
          <div className="right-side">
            <input
              type="text"
              placeholder="Search project..."
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            />

            <button
              className="right-side__btn"
              onClick={() => {
                navigate("add-project");
              }}
            >
              Add new project
            </button>
          </div>
        </div>
      </section>
      <section className="main-section">
        <SingleProjectCard />
      </section>
    </div>
  );
};

export default PMHome;
