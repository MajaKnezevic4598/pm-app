import "./EditProject.scss";
import uuid from "react-uuid";
import { useParams } from "react-router";
import axiosInstance from "../../helpers/axiosInstance";
import { useQuery } from "react-query";
import SingleEmployee from "./SingleEmployee";
import { useState, useEffect } from "react";
import Select from "./Select";
import Default from "../../assets/no-image.png";
import Spinner from "../Spinner.js/Spinner";
import { uploadFiles } from "../../services/uploadFiles";

const EditProject = () => {
  const { id } = useParams();
  console.log(id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const [employeesId, setEmployeesId] = useState([]);

  const fetchSingleProject = async (id) => {
    const res = await axiosInstance.get(
      `projects/${id}?populate=logo&populate=project_manager.profilePhoto&populate=employees.profilePhoto`
    );
    console.log(res.data);
    return res?.data;
  };

  const { data, isLoading, isError, error, refetch, isFetching, status } =
    useQuery(["single-project", id], () => {
      return fetchSingleProject(id);
    });

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data);
      setName(data?.data?.attributes.name);
      setDescription(data?.data?.attributes.description);
      setEmployees(data?.data?.attributes.employees.data);
    }
  }, [data]);

  useEffect(() => {
    console.log(employees);
    if (employees.length !== 0) {
      const ar = employees.map((item) => item.id);
      console.log(ar);
      setEmployeesId([...ar]);
      console.log(employees);
    }
  }, [employees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadFileResponse;
    if (picture) {
      uploadFileResponse = await uploadFiles(picture[0]);
    }

    const employeesSubmit = [];
    employees.map((employee) =>
      employeesSubmit.push({
        id: employee.id,
        email: employee.attributes.email,
      })
    );

    if (description || name || employees || picture) {
      await axiosInstance.put(`projects/${id}`, {
        data: {
          description,
          name,
          employees: employeesSubmit,
          logo: uploadFileResponse ? uploadFileResponse.data[0].id : null,
        },
      });
    }
    refetch();
    setLoading(false);
  };

  if (status === "loading" || loading) {
    return <Spinner />;
  }

  return (
    <div>
      <form className="add-project-conteiner" onSubmit={handleSubmit}>
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
          <div className="logo-conteiner">
            {/* picture je ono sto smo ubacili kao vrednost za input type file */}
            {!picture ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img
                src={
                  data?.data?.attributes?.logo?.data?.attributes?.url === null
                    ? Default
                    : `https://pm-app-bek.herokuapp.com${data?.data?.attributes.logo.data?.attributes.url}`
                }
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={URL.createObjectURL(picture[0])} alt="profile-photo" />
            )}
            <input
              id="file-upload"
              type="file"
              onChange={(e) => setPicture(e.target.files)}
            />
            <label htmlFor="file-upload" className="logo-conteiner__edit-icon">
              <i className="fas fa-pen"></i>
            </label>
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
          <div className="project-members-section__title">
            Add/Remove Employees
          </div>
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
                  profilePhoto={
                    employee.attributes.profilePhoto.data?.attributes.url
                  }
                />
              );
            })}
          </div>
        </section>

        <button className="save-new-project">Edit Project</button>
      </form>
    </div>
  );
};

export default EditProject;
