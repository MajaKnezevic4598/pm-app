import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import employee from "../../services/EmployeeService";
import EmployeeInfo from "./EmployeeInfo";

import Spinner from "../Spinner.js/Spinner";
import "./EmployeeHome.scss";
import Rocket from "../../assets/rocket2.png";

const fetchProjects = async (profileId) => {
  const response = employee.employeeData(profileId);
  return response;
};

const EmployeeHome = () => {
  const storageId = localStorage.getItem("userId");
  const profileId = localStorage.getItem("profileId");
  const [searching, setSearching] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const { data, status } = useQuery(["projects"], () =>
    fetchProjects(profileId)
  );

  useEffect(() => {
    let newProjects = [];
    if (nameFilter !== "") {
      data?.map((project) => {
        if (
          project.attributes.name
            .toLowerCase()
            .includes(nameFilter.toLowerCase())
        ) {
          newProjects.push(project);
        }
      });
      setFilteredProjects(newProjects);
    } else {
      setFilteredProjects(data ? data : []);
      setSearching(false);
    }
  }, [data, nameFilter]);

  const searchByName = (e) => {
    if (e.target.value === "") {
      setNameFilter(e.target.value);
      setSearching(false);
      return;
    }
    setNameFilter(e.target.value);
    setSearching(true);
  };

  if (status === "loading") {
    return <Spinner />;
  }

  const FilteredProjects = () => {
    return filteredProjects?.map((project) => {
      if (project.id !== profileId) {
        return (
          <EmployeeInfo
            key={project.id}
            name={project.attributes.name}
            logo={project.attributes?.logo?.data?.attributes?.url}
            projectManagerName={
              project.attributes?.project_manager?.data?.attributes?.name
            }
            projectManagerPhoto={
              project.attributes?.project_manager?.data?.attributes
                ?.profilePhoto?.data?.attributes?.url
            }
            employeeNumber={project.attributes?.employees?.data?.length}
          />
        );
      }
    });
  };

  return (
    <div className="employee">
      <div className="employee__description">
        <div className="flex-container">
          <div className="header-logo">
            <img
              className="header-logo__project-image"
              src={Rocket}
              alt="Rocket"
            />
          </div>
          <div className="employee__description__left">
            <div>My Projects</div>
            <div>Here you'll find your projects.</div>
          </div>
        </div>
        <div className="employee__description__right">
          <input
            value={nameFilter}
            onChange={searchByName}
            type={"text"}
            placeholder="Search"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="employee__content">
          {data && !searching
            ? data.map((project) => {
                if (project.id != profileId) {
                  return (
                    <EmployeeInfo
                      id={project.id}
                      key={project.id}
                      name={project.attributes.name}
                      logo={project.attributes?.logo?.data?.attributes?.url}
                      projectManagerName={
                        project.attributes?.project_manager?.data?.attributes
                          ?.name
                      }
                      projectManagerPhoto={
                        project.attributes?.project_manager?.data?.attributes
                          ?.profilePhoto?.data?.attributes?.url
                      }
                      employeeNumber={
                        project.attributes?.employees?.data?.length
                      }
                    />
                  );
                }
              })
            : FilteredProjects()}
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
