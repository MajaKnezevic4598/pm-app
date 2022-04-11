import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

import Default from "../../assets/no-image.png";
import Spinner from "../Spinner.js/Spinner";
import SingleNote from "../EmployeeHome/SingleNote";
import EmptyNote from "../EmployeeHome/EmptyNote";
import "../EmployeeHome/EmployeeProjectView.scss";
import axiosInstance from "../../helpers/axiosInstance";
import { useParams } from "react-router-dom";
import CreateNewNote from "./CreateNewNote";

const fetchProject = async (id) => {
  const response = await axiosInstance.get(
    "/projects/" +
      id +
      "?populate=logo&populate=employees.profilePhoto&populate=project_manager.profilePhoto"
  );
  return response.data;
};

const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data.data;
};

const fetchAllNotes = async (id, categoryName, nameFilter, SortValue) => {
  const response = await axiosInstance.get(
    `/notes?filters[category][name][$eq]=${categoryName}&filters[project][id][$eq]=${id}&filters[title][$containsi]=${nameFilter}&sort=createdAt:${SortValue}&populate=profile.profilePhoto`
  );
  return response.data.data;
};

const NotesView = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [sortValue, setSortValue] = useState("DESC");
  const [changeViewState, setChangeViewState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(data);
    console.log(props.notes);
    console.log(changeViewState);
  }, [changeViewState]);

  const { id } = useParams();

  const { data, status } = useQuery(["project"], () => fetchProject(id), {
    keepPreviousData: true,
  });

  const { data: categories, status: categoriesStatus } = useQuery(
    ["categoryPm"],
    () => fetchCategories()
  );

  const {
    data: notes,
    status: notesStatus,
    refetch,
  } = useQuery(
    ["notesPm", sortValue, nameFilter, categoryName],
    () => fetchAllNotes(id, categoryName, nameFilter, sortValue),
    { keepPreviousData: true }
  );

  const changeFunction = () => {
    setChangeViewState(true);
  };

  const searchByName = (e) => {
    setNameFilter(e.target.value);
  };

  const Image = React.memo(function Image({ src }) {
    return (
      <img
        src={src}
        className="employee-info__left__picture"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Default;
        }}
        alt="SomePhoto"
      />
    );
  });
  return (
    <>
      <div className="employee">
        <div className="emp__description">
          <div className="flex-container">
            <div className="header-logo">
              <Image
                src={
                  data?.data?.attributes.logo.data?.attributes.url
                    ? "https://pm-app-bek.herokuapp.com" +
                      data?.data?.attributes.logo.data?.attributes.url
                    : Default
                }
              />
            </div>
            <div className="employee__description__left">
              <div>{data?.data.attributes.name}</div>
              <div>{data?.data.attributes.description}</div>
              <div
                onClick={() => {
                  navigate(`edit-project`);
                }}
              >
                Edit project
              </div>
            </div>
          </div>
          <div className="emp__description__right">
            <div className="manager">
              {data?.data.attributes.project_manager.data?.attributes.name}
            </div>
            <div className="emp__description__right__pmlogo">
              <Image
                src={
                  data?.data.attributes.project_manager.data?.attributes
                    .profilePhoto.data.attributes.url
                    ? "https://pm-app-bek.herokuapp.com" +
                      data?.data.attributes.project_manager.data?.attributes
                        .profilePhoto.data.attributes.url
                    : Default
                }
              />
            </div>
          </div>
          <div className="emp__description__toright">
            <p>Employees</p>
            {data?.data.attributes.employees?.data.map((employee) => {
              return (
                <Image
                  src={
                    employee.attributes.profilePhoto.data
                      ? "https://pm-app-bek.herokuapp.com" +
                        employee.attributes.profilePhoto.data.attributes.url
                      : Default
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
      {!changeViewState ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div className="employee__content">
              <header>
                {categories?.map((category) => {
                  return (
                    <section
                      onClick={() => setCategoryName(category.attributes.name)}
                    >
                      {category.attributes.name}
                    </section>
                  );
                })}
              </header>
            </div>
            <div className="notecreate__button__add" onClick={changeFunction}>
              <button>ADD NOTE</button>
            </div>
          </div>
          <div>
            <div className="employee__content">
              <input
                value={nameFilter}
                onChange={searchByName}
                type={"text"}
                placeholder="Search"
              />
              <select
                onChange={(e) => setSortValue(e.target.value)}
                name="value"
                id="value-select"
              >
                <option value={"ASC"}>Sort by:</option>
                <option value={"ASC"}>Oldest</option>
                <option value={"DESC"}>Newest</option>
              </select>
            </div>
          </div>
          <div>
            {notes?.length < 1 ? <EmptyNote /> : null}
            {notes?.map((note) => {
              return (
                <SingleNote
                  id={note.id}
                  refetch={refetch}
                  name={note.attributes.title}
                  description={note.attributes.description}
                  photo={
                    note.attributes.profile.data?.attributes.profilePhoto.data
                      ?.attributes.url
                  }
                  pmName={note.attributes.profile.data?.attributes.name}
                />
              );
            })}
          </div>
        </>
      ) : (
        <CreateNewNote
          id={id}
          setChangeView={setChangeViewState}
          categories={categories}
        />
      )}
    </>
  );
};

export default NotesView;
