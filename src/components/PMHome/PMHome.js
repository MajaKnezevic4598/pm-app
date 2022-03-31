import React, { useState, useEffect } from "react";
import "./PMHome.scss";
import DefalutPr from "../../assets/rocket2.png";
import SingleProjectCard from "./SingleProjectCard";
import { useNavigate } from "react-router-dom";
import { useAllProjectsForPM } from "../../hooks/useProjectData";
import uuid from "react-uuid";
import DefaultImg from "../../assets/av1.png";

const PMHome = () => {
  const [nameFilter, setNameFilter] = useState("");

  const navigate = useNavigate();
  const profileId = window.localStorage.getItem("profileId");
  console.log(profileId);
  console.log(typeof profileId);

  const { isLoading, data, isError, error } = useAllProjectsForPM(
    profileId,
    nameFilter
  );
  //ovde treba pogledati sta je sa profileId
  console.log(data);
  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

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
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
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
        {data?.data?.data?.attributes?.projectsManaging?.data.map((item) => {
          return (
            <SingleProjectCard
              key={uuid()}
              manager={data.data.data.attributes.name}
              prName={item.attributes.name}
              pmImage={
                data.data.data.attributes.profilePhoto.data.attributes.url
              }
              projectLogo={item?.attributes?.logo?.data?.attributes?.url}
              employees={item.attributes.employees.data.length}
              projectDescription={item.attributes.description}
            />
          );
        })}
      </section>
    </div>
  );
};

export default PMHome;
