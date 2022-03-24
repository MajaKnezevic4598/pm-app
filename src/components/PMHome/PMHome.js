import React, { useState, useEffect } from "react";
import "./PMHome.scss";
import DefalutPr from "../../assets/rocket2.png";

const PMHome = () => {
  const [selectedProject, setSelectedProject] = useState("");

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

            <button className="right-side__btn">Add new project</button>
          </div>
        </div>
      </section>
      <section>Here goes other content!</section>
    </div>
  );
};

export default PMHome;
