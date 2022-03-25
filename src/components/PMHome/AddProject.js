import React, { useState } from "react";
import "./AddProject.scss";
import { postProject } from "../../services/projects";

const AddProject = () => {
  const userId = window.localStorage.getItem("userId");
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    logo: "",
    description: "",
  });

  const handleChange = (e) => {
    setProjectDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submited");
    console.log(projectDetails);
    postProject({ ...projectDetails, id: userId });
    setProjectDetails({
      name: "",
      logo: "",
      description: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="add-project-conteiner">
        <section className="project-info-section">
          <h3>Project Info</h3>
          <div className="project-input">
            <p>Project Name</p>
            <input
              type="text"
              placeholder="Project name"
              name="name"
              value={projectDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="chose-logo">
            <input
              type="file"
              placeholder="chose Logo"
              name="logo"
              onChange={handleChange}
            />
          </div>
          <div className="project-description">
            <p>Project description</p>
            <textarea
              name="description"
              value={projectDetails.description}
              onChange={handleChange}
            />
          </div>
        </section>
        <section className="project-members-section">
          <h3 className="project-members-section__title">Members</h3>
          <div className="project-members-section__find-emp">
            <input type="text" placeholder="find employee" />
            <button>Add</button>
          </div>
          <div className="project-members-section__employees-conteiner">
            <div className="singleEmployee">Single Employee</div>
          </div>
        </section>
        <button className="save-new-project">Save</button>
      </form>
    </div>
  );
};

export default AddProject;
