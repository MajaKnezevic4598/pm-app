import React, { useState } from "react";
import "./AddProject.scss";
import { postProject } from "../../services/projects";
import { uploadFiles } from "../../services/uploadFiles";

const AddProject = () => {
  //kad postujem prosledim id ProfileId
  const profileId = window.localStorage.getItem("profileId");
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState();

  const handleChange = (e) => {
    setProjectDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submited");
    console.log(projectDetails);
    console.log(selectedFile);
    const uploadFileResponse = await uploadFiles(selectedFile);
    console.log("respnse from upload");
    console.log(uploadFileResponse);
    await postProject({
      ...projectDetails,
      id: profileId,
      logo: uploadFileResponse.data[0].id,
    });
    setProjectDetails({
      name: "",
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
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
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
