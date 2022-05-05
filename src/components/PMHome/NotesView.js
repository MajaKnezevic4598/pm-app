import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import { ModalContext } from "../../context/ModalContext";

import Default from "../../assets/no-image.png";
import Spinner from "../Spinner.js/Spinner";
import SingleNote from "../EmployeeHome/SingleNote";
import EmptyNote from "../EmployeeHome/EmptyNote";
// import "../EmployeeHome/EmployeeProjectView.scss";
import "./NotesView.scss";
import axiosInstance from "../../helpers/axiosInstance";
import { useParams } from "react-router-dom";
import CreateNewNote from "./CreateNewNote";
import DeleteProjectModal from "../Modal/DeleteProjectModal";
import uuid from "react-uuid";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

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
    `/notes?filters[category][name][$eq]=${categoryName}&filters[project][id][$eq]=${id}&filters[title][$containsi]=${nameFilter}&sort=createdAt:${SortValue}&populate=profile.profilePhoto&populate=files`
  );
  return response.data.data;
};

const NotesView = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [sortValue, setSortValue] = useState("DESC");
  const [changeViewState, setChangeViewState] = useState();
  // const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  let scrl = useRef(null);

  useEffect(() => {
    if (scrolEnd) {
      console.log("scrollEnd is true");
      console.log(scrolEnd);
    }
  }, [scrolEnd]);

  const styleHeader = {
    borderBottom: "2px solid #987197",
  };

  const styleSection = {
    borderLeft: "2px solid #987197",
    borderRight: "2px solid #987197",
    borderBottom: "2px solid #987197",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
  };

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const handleTab = (index) => {
    setActiveTab(`category-${index}`);
  };
  const navigate = useNavigate();

  const { setIsOpen, isOpen } = useContext(ModalContext);
  console.log(isOpen);

  // useEffect(() => {
  //   // console.log(data);
  //   console.log(props.notes);
  //   console.log(changeViewState);
  // }, [changeViewState]);

  useEffect(() => {
    if (changeViewState === false) {
      refetch();
    }
  }, [changeViewState]);

  const { id } = useParams();

  // const { data, status } = useQuery(["project"], () => fetchProject(id), {
  //   keepPreviousData: false,
  //   cacheTime: 0,
  // });

  const { data, status } = useQuery([`project-${id}`], () => fetchProject(id));

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

  // useEffect(() => {
  //   console.log(notes);
  //   console.log("ovo su note");
  // }, [notes]);

  const changeFunction = () => {
    setChangeViewState(true);
  };

  const searchByName = (e) => {
    setNameFilter(e.target.value);
  };

  const getEmployeesPhotos = useCallback(() => {
    return data?.data.attributes.employees?.data.map((employee) => {
      return (
        <img
          src={
            employee.attributes.profilePhoto.data
              ? "https://pm-app-bek.herokuapp.com" +
                employee.attributes.profilePhoto.data.attributes.url
              : Default
          }
          className="picture"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Default;
          }}
          alt="SomePhoto"
        />
      );
    });
  }, [data]);

  const Image = useCallback(function Image({ src }) {
    return (
      <img
        src={src}
        className="picture"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Default;
        }}
        alt="SomePhoto"
      />
    );
  }, []);

  return (
    <>
      <div className="employee-header">
        <div className="employee-header-conteiner">
          <div className="employee-header-conteiner__left">
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
            <div className="project-details">
              <div className="project-details__head">
                {" "}
                <div>{data?.data.attributes.name}</div>
              </div>

              <div className="project-details__description">
                {data?.data.attributes.description}
              </div>
            </div>
          </div>
          <div className="employee-header-conteiner__middle">
            <div className="middle-picture">
              <Image
                src={
                  data?.data?.attributes.project_manager.data?.attributes
                    .profilePhoto.data?.attributes.url
                    ? "https://pm-app-bek.herokuapp.com" +
                      data?.data?.attributes.project_manager.data?.attributes
                        .profilePhoto.data?.attributes.url
                    : Default
                }
              />
            </div>
            <div className="manager-name">
              {data?.data.attributes.project_manager.data?.attributes.name}
            </div>
          </div>
          <div className="employee-header-conteiner__right">
            <p>Employees</p>
            <div style={{ display: "flex" }}>
              {" "}
              <div className="employees-grid">{getEmployeesPhotos()}</div>
              {/* <span>+1 more</span> */}
            </div>
          </div>
          <div className="edit-delete-conteiner">
            <div className="edit-delete-conteiner__edit">
              <div
                onClick={() => {
                  navigate(`edit-project`);
                }}
              >
                Edit
              </div>
              <BiEdit
                className="edit-project"
                onClick={() => {
                  navigate(`edit-project`);
                }}
              />
            </div>
            <div className="edit-delete-conteiner__delete">
              {" "}
              <div
                onClick={(e) => {
                  setIsOpen(true);
                  console.log("kliknuto na delete project");
                }}
              >
                Delete
              </div>
              <MdDelete
                className="delete-project"
                onClick={(e) => {
                  setIsOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {!changeViewState ? (
        <>
          <div className="notes-view">
            <div className="notes-view__conteiner">
              <div className="header-conteiner">
                {scrollX !== 0 && (
                  <button className="prev" onClick={() => slide(-100)}>
                    <BsFillCaretLeftFill className="left-arrow" />
                  </button>
                )}
                <header
                  style={activeTab ? styleHeader : null}
                  ref={scrl}
                  onScroll={scrollCheck}
                >
                  {categories?.map((category, index) => {
                    return (
                      <div
                        className={
                          activeTab === `category-${index}` ? "active" : ""
                        }
                        onClick={() => {
                          setCategoryName(category.attributes.name);
                          handleTab(index);
                        }}
                      >
                        {category.attributes.name}
                      </div>
                    );
                  })}
                </header>
                {!scrolEnd && (
                  <button className="next" onClick={() => slide(+100)}>
                    <BsFillCaretRightFill className="right-arrow" />
                  </button>
                )}
              </div>

              <section style={activeTab ? styleSection : null}>
                <div className="add-search-filter">
                  <div>
                    <input
                      value={nameFilter}
                      onChange={searchByName}
                      type={"text"}
                      placeholder="Search"
                    />
                  </div>
                  <div>
                    {" "}
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
                  <div>
                    <button className="add-project" onClick={changeFunction}>
                      ADD NOTE
                    </button>
                  </div>
                </div>
                <div className="empty-note">
                  {notes?.length < 1 ? <EmptyNote /> : null}
                  {notes?.map((note) => {
                    return (
                      <SingleNote
                        key={uuid()}
                        id={note.id}
                        refetch={refetch}
                        name={note.attributes.title}
                        description={note.attributes.description}
                        photo={
                          note.attributes.profile.data?.attributes.profilePhoto
                            .data?.attributes.url
                        }
                        pmName={note.attributes.profile.data?.attributes.name}
                        files={note.attributes.files.data}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <CreateNewNote
          id={id}
          setChangeView={setChangeViewState}
          categories={categories}
        />
      )}
      <DeleteProjectModal
        projectId={id}
        projectName={data?.data.attributes.name}
        projectManager={
          data?.data.attributes.project_manager.data?.attributes.name
        }
        disabled={disabled}
      />
    </>
  );
};

export default NotesView;
