import React, { useEffect, useState } from 'react';
import './AddProject.scss';
import { uploadFiles } from '../../services/uploadFiles';
import { useAddSingleProject } from '../../hooks/useProjectData';
import Select from './Select.js';
import SingleEmployee from './SingleEmployee';
import { useNavigate } from 'react-router';
import uuid from 'react-uuid';
import Default from '../../assets/person-profile.png';

const AddProject = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesId, setEmployeesId] = useState([]);
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
    console.log('iz add projecta');
    if (employees.length !== 0) {
      console.log('vise nisam prazan');
      const ar = employees.map((item) => item.id);
      console.log(ar);
      setEmployeesId([...ar]);
    }
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

    const employeesSubmit = [];

    employees.map((employee) =>
      employeesSubmit.push({
        id: employee.id,
        email: employee.attributes.email,
      })
    );

    const projectData = {
      ...projectDetails,
      id: profileId,
      logo: uploadFileResponse ? uploadFileResponse.data[0].id : null,
      employees: employeesSubmit,
    };
    mutate(projectData);

    setProjectDetails({
      name: '',
      description: '',
    });
  };
  return (
    <div
      style={{
        height: 'auto',
      }}
    >
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
          <div className="logo-conteiner">
            {!selectedFile ? (
              <img src={Default} alt="profile" className="default-image" />
            ) : (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={URL.createObjectURL(selectedFile[0])}
                alt="profile-photo"
              />
            )}

            <input
              id="file-upload"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files)}
            />
            <label htmlFor="file-upload" className="logo-conteiner__edit-icon">
              <i className="fas fa-pen"></i>
            </label>
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
          <div className="project-members-section__title">Add Employee</div>
          <Select employees={employees} setEmployees={setEmployees} />
          <div className="employees-conteiner">
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
          </div>
        </section>

        <button className="save-new-project">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
