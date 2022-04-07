import "./EditProject.scss";
import uuid from "react-uuid";
import { useParams } from "react-router";
import axiosInstance from "../../helpers/axiosInstance";
import { useQuery } from "react-query";
import SingleEmployee from "./SingleEmployee";
import { useState, useEffect } from "react";
import Select from "./Select";

const EditProject = () => {
  const { id } = useParams();
  console.log(id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);

  const fetchSingleProject = async (id) => {
    const res = await axiosInstance.get(
      `projects/${id}?populate=logo&populate=project_manager.profilePhoto&populate=employees.profilePhoto`
    );
    console.log(res.data);
    return res?.data;
  };

  const { data, isLoading, isError, error } = useQuery(
    ["single-project", id],
    () => {
      return fetchSingleProject(id);
    }
  );
  useEffect(() => {
    if (data) {
      console.log(data?.data);
      setName(data?.data?.attributes.name);
      setDescription(data?.data?.attributes.description);
      setEmployees(data?.data?.attributes.employees.data);
    }
  }, [data]);

  useEffect(() => {
    console.log(employees);
  }, [employees]);
  return (
    <div>
      <form className="add-project-conteiner">
        <section className="project-info-section">
          <h3>Project Info</h3>
          <div className="project-input">
            <p>Project Name:</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="chose-logo">
            <input
              type="file"
              placeholder="chose Logo"
              name="logo"
              //   onChange={(e) => {
              //     setSelectedFile(e.target.files[0]);
              //   }}
            />
          </div>
          <div className="project-description">
            <p>Project description</p>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
      jellooo
    </div>
  );
};

export default EditProject;
