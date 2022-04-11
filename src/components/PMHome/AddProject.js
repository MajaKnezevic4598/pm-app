import React, { useEffect, useState } from 'react';
import './AddProject.scss';
import { uploadFiles } from '../../services/uploadFiles';
import { useAddSingleProject } from '../../hooks/useProjectData';
import Select from './Select.js';
import SingleEmployee from './SingleEmployee';
import { useNavigate } from 'react-router';
import uuid from 'react-uuid';

const AddProject = () => {
  const [employees, setEmployees] = useState([]);
  const profileId = window.localStorage.getItem('profileId');
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
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

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  const onSuccess = () => {
    alert('uspesan post');
    navigate('/');
  };

  const { mutate } = useAddSingleProject(onSuccess);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      projectDetails.name === '' ||
      projectDetails.description === '' ||
      employees.length === 0
    ) {
      return;
    }
    let uploadFileResponse;
    if (selectedFile) {
      uploadFileResponse = await uploadFiles(selectedFile);
    }

    const projectData = {
      ...projectDetails,
      id: profileId,
      logo: uploadFileResponse ? uploadFileResponse.data[0].id : null,
      employees: [...employees, employees.id],
    };
    mutate(projectData);

    setProjectDetails({
      name: '',
      description: '',
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="add-project-conteiner">
        <section className="project-info-section">
          <h3>Project Info</h3>
          <div className="project-input">
            <p>Project Name:</p>
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
          <div>Add Employee</div>
          <Select employees={employees} setEmployees={setEmployees} />
          {employees.map((employee) => {
            return (
              <SingleEmployee
                key={uuid()}
                name={employee.attributes.name}
                setEmployees={setEmployees}
                employees={employees}
                id={employee.id}
              />
            );
          })}
        </section>

        <button className="save-new-project">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
